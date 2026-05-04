# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]

### Documentation

- Documented the dot-path convention for every key-taking function in a
  new "Conventions" section of the README, with an explicit note that
  `extract` remains top-level-only (deferred to v3 to avoid a v2
  breaking change).

### Tests

- Added nested-path coverage for `where` to lock in the convention.

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
