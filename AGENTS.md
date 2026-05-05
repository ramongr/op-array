# AGENTS.md

Conventions for any human or agent contributing to **op-array**. Read this
before opening a PR. Everything below is enforced by review or by
`npm run lint && npm run typecheck && npm test && npm run build`.

## Project layout

```
src/
  <category>/
    <functionName>.ts      # one function per file
    index.ts               # re-exports every function in the category
  shared/                  # internal helpers (not part of the public API)
  index.ts                 # re-exports every category
tests/
  <category>/
    <category>.test.ts     # one file per category, one describe per function
  shared/
    <helper>.test.ts       # one file per shared helper
docs/
  <category>.md            # public docs per category
```

Categories: `collections`, `logical`, `numerical`, `positional`,
`transformations`. Each category is also published as a subpath
(`op-array/collections`, etc.); keep the category boundary intentional.

## Code style

- **Named `export function`** declarations only. No default exports, no
  `export const fn = () => …`.
- **Explicit return types** are required (oxlint enforces).
- Inputs are **`readonly T[]`** unless mutation is unavoidable.
- Relative imports use the **`.js` suffix** (NodeNext/ESM resolution).
- Use **`import type`** for type-only imports (oxlint enforces
  `consistent-type-imports`).
- Avoid `any`. `unknown` is fine when truly unknown.
- JSDoc on every exported function: one-line summary, then `@example`
  when the call shape isn't obvious from the signature, then `@throws`
  when applicable.
- No `console.*` in `src/`.

### Empty-input policy

Match the v2.0 precedent. New functions must pick the option that fits
their category and document it.

| Operation kind        | Empty input           | Examples            |
|-----------------------|-----------------------|---------------------|
| Additive aggregate    | identity (`0`)        | `sum`               |
| Multiplicative / fold | `TypeError`           | `product`, `subtract`, `median` |
| Statistical mean      | `NaN`                 | `average`           |
| Set / list result     | `[]`                  | `mode`, `unique`, `intersection`, `pluck` |
| Boolean predicate     | `false` (document)    | `exists`, `existsAll`, `existsAny` |
| Map / index result    | `{}`                  | `keyBy`, `groupBy`, `countBy` |
| Pair-of-lists result  | both empty            | `partition` -> `{ pass: [], fail: [] }` |
| Find item by criterion | `undefined`          | `minBy`, `maxBy` |

Throw `RangeError` for invalid numeric arguments (e.g. group size ≤ 0)
and `TypeError` for empty arrays where the result is mathematically
undefined.

### Dot-path key access

Any function that takes a `key: string` argument resolves it as a
dot-delimited path through `src/shared/pathResolver.ts` (which delegates
to `nestedObjectValue`). This is the single, consistent way to address
nested fields across the API. Never accept a callback as an alternative
overload.

```ts
import { pathResolver } from '../shared/pathResolver.js';

const at = pathResolver(key);
collection.map(at);
```

## Test style

- Vitest. One `tests/<category>/<category>.test.ts` per category, with
  a top-level `describe(<functionName>)` per function.
- Each function must cover at minimum:
  1. happy path
  2. empty-input behaviour (per the table above)
  3. any documented edge case (no-mutation, ordering, throws, missing
     path resolves to `undefined`, duplicate keys, etc.)
- Imports go through the category index:
  `import { pluck } from '../../src/collections/index.js';`
- Use `.toEqual` for structural equality, `.toBe` for primitives, and
  `.toThrow(TypeError)` / `.toThrow(RangeError)` for error contracts.

## Documentation

Every PR that adds, renames, or changes the contract of a public
function must update **all three** of:

1. `docs/<category>.md` — section per function with at least one
   runnable example. Keep the same heading shape as siblings:
   `## ` + `` `name(arg, arg)` ``.
2. `README.md` — the **API overview** table.
3. `CHANGELOG.md` — an entry under `## [2.1.0]` (Keep a Changelog
   format). Group entries under `### Added`, `### Changed`,
   `### Fixed`, `### Tooling`.

Internal-only changes (under `src/shared/`) only need the `CHANGELOG`
entry under `### Tooling` or no entry at all.

## Quality gate

Every commit pushed to a PR must pass, locally and in CI:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Run these before pushing. CI runs the same matrix on Node 20 and 22.

## Git & PR workflow

- **Base branch:** `main`. No long-lived integration branch.
- **One issue → one branch → one PR.**
- **Branch names:** `feat/<issue>-<slug>`, `fix/<issue>-<slug>`,
  `chore/<issue>-<slug>`, `docs/<slug>`.
  Examples: `feat/19-pluck`, `chore/24-dot-path-audit`.
- **Conventional Commits** for the PR's main commit:
  `feat(<category>): add <name> (#<issue>)`,
  `fix(<category>): …`, `chore: …`, `docs: …`.
- **PR title** mirrors the commit subject.
- **PR body** uses this template:

  ```md
  ## Summary
  One- or two-sentence description of intent.

  ## Changes
  - bullet per noteworthy change
  - tests / docs / changelog updated

  Closes #<issue>
  ```

- A PR adding a public function is **self-contained**: implementation,
  tests, `docs/<category>.md` entry, README table update, and
  `CHANGELOG.md` entry.
- Don't merge your own PRs, don't force-push to `main`, don't `--amend`
  pushed commits.
- **Always assign the repo owner, link the issue, and set the milestone.**
  See the `github-pr` skill in `.opencode/skills/github-pr/SKILL.md`
  for the exact `gh pr create` invocation. Every PR in this repo must:
  - have `ramongr` as the assignee,
  - include `Closes #<issue>` in the body,
  - be attached to the same milestone as the originating issue
    (e.g. `v2.1`).

## Tooling

- Node ≥ 20 (managed via [mise](https://mise.jdx.dev), see `mise.toml`).
- Package manager: `npm`.
- Build: `tsup` (dual ESM + CJS, types per entry).
- Tests: `vitest` with v8 coverage.
- Lint: [`oxlint`](https://oxc.rs) (config in `.oxlintrc.json`).
