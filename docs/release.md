# Release process

This repo ships through a milestone-driven pipeline. The happy path is
**close the milestone, walk away.** This document covers what runs
automatically, the boundary contracts between the workflows, and the
manual recovery paths if any link in the chain breaks.

## Pipeline overview

```
  v2.x milestone closed
          │
          ▼
  release.yml ─────────────────────────────► chore/release-2.x.0 PR
          │                                   (auto-merge enabled)
          │  bumps package.json + dates
          │  CHANGELOG, runs quality gate
          │
          ▼
  PR merges to main
          │
          ▼
  tag-on-release-merge.yml ───────────────► v2.x.0 tag pushed
          │                                  + workflow_dispatch on
          │                                  publish-on-tag.yml
          ▼
  publish-on-tag.yml
          │  quality gate, version sanity check
          │  npm publish --provenance (OIDC, no NPM_TOKEN)
          │  gh release create --generate-notes
          ▼
  Published to npm + GitHub Release
```

## Workflows

### `.github/workflows/release.yml`

- **Trigger:** `milestone: closed` (auto) or `workflow_dispatch` with a
  `milestone` input.
- **Output:** opens `chore/release-<VERSION>` PR against `main`,
  attached to the originating milestone, with auto-merge enabled.
- **Node:** 24 via `actions/setup-node@v4` (matches `publish-on-tag`).
- **Milestone attachment:** PR is created without `--milestone`
  (the milestone is already closed by the time this runs, and
  `gh pr create --milestone` only resolves *open* milestones by
  title), then attached via `gh api -X PATCH .../issues/<PR> -F
  milestone=<id>`.

### `.github/workflows/tag-on-release-merge.yml`

- **Trigger:** any merged PR whose head branch starts with
  `chore/release-`.
- **Behaviour:** reads the version from `package.json`, pushes
  `v<VERSION>`, then explicitly dispatches `publish-on-tag.yml` via
  `gh workflow run`.
- **Why the explicit dispatch:** GitHub's anti-recursion rule means
  tags pushed using the default `GITHUB_TOKEN` do **not** fire the
  `on: push: tags` trigger of another workflow. Rather than introduce
  a PAT or GitHub App token, this workflow invokes the publish
  workflow directly (it already supports `workflow_dispatch` with a
  `tag` input). npm Trusted Publishing via OIDC handles the actual
  registry authentication on the publish side.
- **Permissions:** needs `contents: write` (push tag) + `actions:
  write` (dispatch the publish workflow).

### `.github/workflows/publish-on-tag.yml`

- **Trigger:** `push: tags: [v*.*.*]` (when a human pushes a tag) or
  `workflow_dispatch` with a `tag` input (when invoked by
  `tag-on-release-merge.yml`).
- **Auth:** npm Trusted Publishing via OIDC (`id-token: write`,
  `environment: npm-publish`). No long-lived `NPM_TOKEN` stored in the
  repo.
- **Node:** 24 via `actions/setup-node@v4` (npm 11.x ships with Node
  24, which is the minimum for Trusted Publishing).

## Manual recovery

If the chain breaks midway, fire the next stage manually with
`workflow_dispatch`. All downstream steps are idempotent.

| If the failure is at...                     | Recover with                                               |
|---------------------------------------------|------------------------------------------------------------|
| `release.yml` (PR not opened or unmilestoned) | `gh workflow run release.yml -f milestone=v2.x`            |
| `tag-on-release-merge.yml` (tag not pushed)   | `git tag -a v2.x.0 -m "Release v2.x.0" && git push origin v2.x.0` from `main` at the merged release commit |
| Publish not invoked after tag push            | `gh workflow run publish-on-tag.yml -f tag=v2.x.0`         |
| Publish ran but failed mid-flight             | Fix the root cause, then re-run: `gh workflow run publish-on-tag.yml -f tag=v2.x.0` |

`publish-on-tag.yml` will refuse to publish if `op-array@<VERSION>` is
already on npm (the `npm view` pre-flight check), so re-running after
a successful publish is safe — it will simply error out at the
sanity check.

## Versioning rules

- Milestone titles must match `vMAJOR.MINOR` (e.g. `v2.2`).
- The minor version closes as `MAJOR.MINOR.0`. Patch releases are
  ad-hoc and not yet automated; cut them by manually bumping
  `package.json`, opening a `chore/release-MAJOR.MINOR.PATCH` PR, and
  letting `tag-on-release-merge.yml` take over.
- `CHANGELOG.md` must contain an unreleased `## [MAJOR.MINOR.0]`
  heading before `release.yml` runs; the workflow date-stamps it in
  place.

## Out of scope

- `dist-tag` branching (`latest` vs `next`): a v3-era concern.
- Migrating the broader CI (`main.yml`) off mise: only the release-time
  workflows need to be on the npm-Trusted-Publishing-compatible Node.
