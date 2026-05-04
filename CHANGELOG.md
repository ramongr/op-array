# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - Unreleased

### Added

- `symmetricDifference(left, right)`: items present in exactly one of
  the two arrays (xor). Left-first then right ordering, duplicates
  collapsed via `Set`. O(n + m).
- `isSubset(left, right)`: `true` when every distinct element of `left`
  is in `right`. Empty `left` is vacuously a subset. O(n + m).
- `isSuperset(left, right)`: `true` when every distinct element of
  `right` is in `left`. Any `left` is a superset of `[]`. O(n + m).

### Tooling

- Replaced ESLint + `typescript-eslint` with [oxlint](https://oxc.rs).
  Lint config moved from `eslint.config.js` to `.oxlintrc.json`. The
  rule set was tightened: `correctness`, `suspicious`, and `perf`
  categories run as errors with `denyWarnings: true`, plus a curated
  list of TypeScript, import, unicorn, and core ESLint rules
  (`no-non-null-assertion`, `consistent-type-exports`,
  `no-param-reassign`, `prefer-template`, `import/no-default-export`,
  `import/no-cycle`, `unicorn/prefer-at`, `unicorn/no-array-sort`,
  etc.). Tests get a small relaxed override.
- Bumped `tsconfig.json` `lib` to `ES2023` so the codebase can use
  `Array.prototype.toSorted` (Node ≥20 already required at runtime).

### Changed

- `compact` uses the idiomatic `.filter(Boolean) as NonNullable<T>[]`.
- `unique`, `union`, `occurrences` use spread instead of `Array.from`.
- `median` uses `Array.prototype.toSorted` instead of
  `[...values].sort(...)`.
- `last` uses `Array.prototype.at(-1)`.
- `flat` drops a redundant inferable type annotation.

  These are pure refactors; behaviour is unchanged and existing tests
  still pass at 100% coverage.

## [2.1.0] - 2026-05-04

### Added

- `existsAny(source, items)`: disjunctive sibling of `existsAll`.
- `equals(left, right)`: order- and duplicate-insensitive set-equality
  for arrays.
- `partition(collection, predicate)`: single-pass split into
  `{ pass, fail }` buckets.
- `pluck(collection, key)`: project a single dot-path field to a flat
  array of values.
- `keyBy(collection, key)`: index a collection by a dot-path value into
  a single-item lookup.
- `groupBy(collection, key)`: group items by a dot-path value into
  per-bucket arrays.
- `countBy(collection, key)`: per-bucket counts indexed by a dot-path
  value.
- `uniqueBy(values, key)`: dedupe a collection by a dot-path value,
  first occurrence wins.

### Documentation

- Documented the dot-path convention for every key-taking function in a
  new "Conventions" section of the README, with an explicit note that
  `extract` remains top-level-only (deferred to v3 to avoid a v2
  breaking change).

### Tests

- Added nested-path coverage for `where` to lock in the convention.

### Tooling

- Added internal `pathResolver(path)` helper in `src/shared/` to centralise
  dot-path access for upcoming `*By` helpers.
- Added milestone-driven release automation. Closing a `vMAJOR.MINOR`
  milestone now opens a `chore(release): MAJOR.MINOR.0` PR (auto-merge
  enabled) which on merge tags `vMAJOR.MINOR.0` and triggers
  `npm publish --provenance --access public` plus a GitHub Release with
  notes auto-generated from the milestone's PRs. See
  `.github/workflows/release.yml`, `tag-on-release-merge.yml`, and
  `publish-on-tag.yml`.
- Authenticated `npm publish` via npm Trusted Publishing (OIDC) inside
  the `npm-publish` GitHub Environment — no long-lived `NPM_TOKEN`
  stored in the repo.

## [2.0.0] - 2026-05-04

### Breaking changes

- **Dropped `Array.prototype` extension entirely.** All operations are now
  exported as standalone functions. Import them by name and call them with
  the array as the first argument:
  ```ts
  // v1
  import 'op-array/dist/numerical';
  [1, 2, 3].sum();

  // v2
  import { sum } from 'op-array';
  sum([1, 2, 3]);
  ```
- Renamed `subtraction` -> `subtract`.
- Renamed `isEvenLength` -> `hasEvenLength`.
- `first`, `second`, `third`, `last` are now functions instead of getters.
- `exists` no longer accepts arrays. Use `existsAll` for the array form.
- `subtract`, `product`, and `median` now throw `TypeError` on empty input
  instead of silently returning `undefined`/`NaN`.

### Added

- TypeScript source with full `.d.ts` declarations.
- Dual ESM + CJS build via [tsup](https://tsup.egoist.dev).
- Per-category subpath imports: `op-array/collections`, `/logical`,
  `/numerical`, `/positional`, `/transformations`.
- `existsAll(arr, items)`: batch membership check.
- `inGroupsOf(arr, size)`: split into groups of a fixed size.
- `compactNullish(arr)`: removes only `null`/`undefined`.
- `flat(arr, depth?)`: depth parameter mirroring native `Array.prototype.flat`.

### Fixed

- `median` no longer mutates its input and now sorts numerically (was
  lexicographic).
- `flat` correctly handles single-nested arrays and empty arrays.
- `compact` uses a clear `Boolean` predicate instead of the
  `JSON.stringify(value) !== '{}'` workaround.
- `intersection`, `except`, `union`, `unique` now run in O(n + m) using `Set`.

### Tooling

- Migrated to TypeScript (strict, `noUncheckedIndexedAccess`).
- Switched test runner from Jest to Vitest.
- Switched lint config to ESLint v9 flat config + `typescript-eslint`.
- Node version managed via [mise](https://mise.jdx.dev) (`mise.toml`).
- Switched package manager to npm.
- Removed Babel toolchain.
- Switched license file/declaration from ISC to MIT.
