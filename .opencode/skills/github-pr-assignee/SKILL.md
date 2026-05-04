---
name: github-pr-assignee
description: Use when creating a GitHub pull request in this repo. Ensures the repo owner is set as the assignee on every PR.
---

# GitHub PR assignee

Whenever you create a pull request in this repository (via `gh pr create`
or any other mechanism), you **must** set `ramongr` as the assignee.

## How

Pass `--assignee ramongr` (or the shorthand `--assignee @me` when running
as that user) to `gh pr create`:

```sh
gh pr create \
  --title "<conventional-commit subject>" \
  --base main \
  --assignee ramongr \
  --body "$(cat <<'EOF'
## Summary
...

## Changes
- ...

Closes #<issue>
EOF
)"
```

## If you forgot

If a PR was already opened without an assignee, fix it immediately:

```sh
gh pr edit <pr-number> --add-assignee ramongr
```

## Why

The repo owner reviews and merges every PR. Assigning them up front
surfaces the PR in their dashboard and triggers their review workflow
without an extra mention.
