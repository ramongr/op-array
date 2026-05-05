# AGENTS.md

Conventions for any human or agent contributing to **op-array**. Read this
before opening a PR. Everything below is enforced by review or by
`npm run lint && npm run typecheck && npm test && npm run build`.

> **v3 is in progress.** The conventions below describe the **v3 target
> state** (data-first + options-object calling convention, dot-paths
> everywhere, ESM-only). v2.x is in **patch-only mode**: bug-fix PRs that
> ship as `2.x.y` keep v2.x's existing positional API and dual ESM+CJS
> build untouched. Roadmaps:
> [v3.0](https://github.com/ramongr/op-array/issues/86)
> · [v3.1](https://github.com/ramongr/op-array/issues/87)
> · [v3.2](https://github.com/ramongr/op-array/issues/88)
> · [v3.3](https://github.com/ramongr/op-array/issues/89).

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

## Calling convention

Every function uses **data-first + options-object**:

- The **first positional argument is the primary data** — the array (or
  arrays) being operated on.
- **Every subsequent argument folds into a single options object** with
  named fields. No second/third/Nth positional argument.
- Single-argument functions stay positional (`sum(values)`,
  `unique(values)`, `first(values)`).

```ts
findBy(users, { key: 'profile.email', value: 'a@b' });
groupBy(orders, { key: 'customer' });
quantile(values, { q: 0.95 });
flat(values, { depth: 2 });
nth(values, { index: -1 });
variance(values, { mode: 'sample' });
```

### Carve-out for pure-data multi-array functions

Functions whose multiple arguments are all **primary data of equal
status** keep them positional. There is no options object. This applies
to:

- Set operations: `intersection`, `union`, `except`,
  `symmetricDifference`, `setEquals`, `isSubset`, `isSuperset`,
  `isDisjoint`.
- Membership predicates: `exists`, `existsAll`, `existsAny`.
- Pair helpers: `zip` (the second array is data, not config).

```ts
intersection(left, right);
isSubset(left, right);
existsAll(source, items);
```

### Per-function `Options` type

Every multi-arg function exports a named options type alongside it,
formed as `<FunctionName>Options`:

```ts
export type FindByOptions<T, P extends Paths<T>> = {
  key: P;
  value: Get<T, P>;
};

export function findBy<T, P extends Paths<T>>(
  collection: readonly T[],
  options: FindByOptions<T, P>,
): T | undefined { … }
```

Both the function and its options type are re-exported from the
category index.

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

| Operation kind         | Empty input          | Examples            |
|------------------------|----------------------|---------------------|
| Additive aggregate     | identity (`0`)       | `sum`, `cumulativeSum` (returns `[]`) |
| Multiplicative / fold  | `TypeError`          | `product`, `subtract`, `median`, `min`, `max`, `range`, `variance`, `standardDeviation`, `quantile` |
| Statistical mean       | `NaN`                | `average`, `averageBy` |
| Set / list result      | `[]`                 | `mode`, `unique`, `uniqueBy`, `pluck`, `compactNullish`, `compactFalsy`, `flat`, `intersection`, `union`, `except`, `symmetricDifference` |
| Membership predicate   | `false` (empty source) | `exists`, `existsAny` |
| Set-theoretic predicate | follow vacuous truth | `existsAll(_, [])` → `true`; `isSubset([], _)` → `true`; `isSuperset(_, [])` → `true`; `isDisjoint(_, [])` → `true`; `setEquals([], [])` → `true` |
| Map / index result     | `{}` or `Map()`      | `keyBy`, `groupBy`, `countBy`, `occurrences` (returns `Map()`) |
| Pair-of-lists result   | both empty           | `partition` -> `{ pass: [], fail: [] }` |
| Find item by criterion | `undefined`          | `findBy`, `where` (returns `[]`), `first`, `last`, `nth`, `minBy`, `maxBy` |

Throw `RangeError` for invalid numeric arguments (e.g. group size ≤ 0,
quantile `q` outside `[0, 1]`) and `TypeError` for empty arrays where
the result is mathematically undefined.

### Dot-path key access

All key and path access in the public API uses dot-delimited paths,
resolved through `src/shared/pathResolver.ts` (which delegates to
`nestedObjectValue`). This is the single, consistent way to address
nested fields. There are no shallow-key overloads, no `keyof T`-typed
shortcuts, and no callback alternatives.

This applies to:

- single-key fields on options objects: `key: 'profile.email'`,
- multi-key fields: `paths: ['user.name', 'contact.email']` (e.g. on
  `extract`),
- typed via the shared `Paths<T>` helper, with results inferred via
  `Get<T, P>`.

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
3. `CHANGELOG.md` — an entry under `## [Unreleased]` (Keep a Changelog
   format). Group entries under `### Added`, `### Changed`,
   `### Removed`, `### Fixed`, `### Tooling`. Breaking-change PRs
   targeting the `v3.0` milestone must also include a **Migration**
   section in the PR body — these get aggregated into `MIGRATION-v3.md`
   before tagging `3.0.0`.

Internal-only changes (under `src/shared/`) only need the `CHANGELOG`
entry under `### Tooling` or no entry at all.

## Docs site

The `docs/*.md` files and `CHANGELOG.md` at the repo root remain the
source of truth. They are also published to GitHub Pages at
<https://ramongr.github.io/op-array> via `.github/workflows/docs.yml`,
which builds the Astro Starlight project under `site/` and deploys on
every push to `main` that touches `docs/`, `CHANGELOG.md`, or `site/`.

- Local preview: `npm run docs:install` (one-time), then
  `npm run docs:dev`.
- Local build: `npm run docs:build` (mirrors the CI smoke job).
- Edit `docs/<category>.md` and `CHANGELOG.md` only. Files under
  `site/src/content/docs/` (other than `index.mdx`) are generated by
  `site/scripts/sync-docs.mjs` at build time and are gitignored.
- The site's "Edit this page" links point back to the original
  `docs/<file>.md` on `main`.

## Quality gate

Every commit pushed to a PR must pass, locally and in CI:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Run these before pushing. CI runs the same matrix on Node 22, 24, and 25.

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

- Node ≥ 22 (managed via [mise](https://mise.jdx.dev), see `mise.toml`).
- Package manager: `npm`.
- Build: `tsup` (dual ESM + CJS, types per entry).
- Tests: `vitest` with v8 coverage.
- Lint: [`oxlint`](https://oxc.rs) (config in `.oxlintrc.json`).
