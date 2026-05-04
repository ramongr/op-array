# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]

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
