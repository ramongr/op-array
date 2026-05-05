# op-array

[![Maintainability](https://api.codeclimate.com/v1/badges/123da94caf5cc7178bec/maintainability)](https://codeclimate.com/github/ramongr/op-array/maintainability)
[![codecov](https://codecov.io/gh/ramongr/op-array/branch/main/graph/badge.svg?token=nWzOn3AxHs)](https://codecov.io/gh/ramongr/op-array)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A small, tree-shakable, **functional** utility library that fills the gaps
in JavaScript's built-in `Array` API. Written in TypeScript, ships ESM + CJS
builds with first-class type definitions.

> **v2 is a complete rewrite.** v1 mutated `Array.prototype`. v2 ships only
> standalone functions. See [CHANGELOG.md](CHANGELOG.md) for the migration
> guide.

## Installation

```sh
npm install op-array
```

## Usage

```ts
import { sum, unique, findBy } from 'op-array';

sum([1, 2, 3]);                     // 6
unique([1, 2, 2, 3]);               // [1, 2, 3]
findBy(users, 'profile.email', x);  // first matching user
```

Or import a single category as a subpath:

```ts
import { min, max, average, median } from 'op-array/numerical';
```

Subpaths available: `op-array/collections`, `op-array/logical`,
`op-array/numerical`, `op-array/positional`, `op-array/transformations`.

## Conventions

Any function that takes a `key: string` argument (`findBy`, `where`,
`pluck`, `keyBy`, `groupBy`, `countBy`, `uniqueBy`, …) resolves it as a
**dot-delimited path** through the nested object — the same semantics
as `findBy(arr, 'profile.email', 'a@x')`. Missing segments resolve to
`undefined`. There is no callback overload; this single, consistent way
to address fields is intentional.

> **Limitation:** `extract` currently accepts only top-level keys
> (`keyof T`) for type-safety reasons. Adding dot-path support would
> change its return type and is therefore deferred to v3. Use `pluck`
> for single-field projection if you need nested access today.

## API overview

| Category | Functions |
|---|---|
| **Collections** | `findBy`, `findById`, `where`, `extract`, `pluck`, `keyBy`, `groupBy`, `countBy` |
| **Logical** | `intersection`, `except`, `union`, `exists`, `existsAll`, `existsAny`, `equals`, `symmetricDifference`, `isSubset`, `isSuperset`, `isDisjoint` |
| **Numerical** | `min`, `max`, `sum`, `subtract`, `product`, `average`, `hasEvenLength`, `median`, `mode`, `range` |
| **Positional** | `first`, `second`, `third`, `last` |
| **Transformations** | `unique`, `uniqueBy`, `flat`, `inGroups`, `inGroupsOf`, `occurrences`, `compact`, `compactNullish` |

For details and examples see the per-category docs:

- [Collections](docs/collections.md)
- [Logical](docs/logical.md)
- [Numerical](docs/numerical.md)
- [Positional](docs/positional.md)
- [Transformations](docs/transformations.md)

## Migrating from v1

v1 patched `Array.prototype`. v2 exports plain functions taking the array
as the first argument.

| v1 | v2 |
|---|---|
| `import 'op-array/dist/numerical'` then `[1,2].sum()` | `import { sum } from 'op-array'` then `sum([1, 2])` |
| `arr.findBy('id', 1)` | `findBy(arr, 'id', 1)` |
| `arr.first` | `first(arr)` |
| `arr.subtraction()` | `subtract(arr)` |
| `arr.isEvenLength()` | `hasEvenLength(arr)` |
| `arr.exists([1, 2])` | `existsAll(arr, [1, 2])` |

## Development

This project uses [mise](https://mise.jdx.dev) for tool versioning and npm
for packages.

```sh
mise install      # installs Node 22
npm install
npm test          # vitest with coverage
npm run lint
npm run typecheck
npm run build     # tsup -> dist/
```

## Releasing

Releases are triggered by **closing a GitHub milestone** named
`vMAJOR.MINOR` (e.g. `v2.1`). The release workflow then:

1. Verifies every issue and PR in the milestone is closed/merged and
   the full quality gate passes.
2. Opens a `chore(release): MAJOR.MINOR.0` PR that bumps `package.json`
   and date-stamps the matching `CHANGELOG.md` heading. Auto-merge is
   enabled.
3. On PR merge, tags `vMAJOR.MINOR.0` and publishes to npm with
   provenance, then creates a GitHub Release with notes auto-generated
   from the milestone's merged PRs.

Authentication to npm uses **npm Trusted Publishing** (OIDC) — there
is no long-lived `NPM_TOKEN` in the repo. The publish job runs inside
the `npm-publish` GitHub Environment, which is restricted to the `main`
branch and (optionally) gated on a manual approval. The matching
Trusted Publisher is registered on npmjs.com against the
`publish-on-tag.yml` workflow with environment `npm-publish`.

See `.github/workflows/release.yml`, `tag-on-release-merge.yml`, and
`publish-on-tag.yml`.

## License

MIT — see [LICENSE](LICENSE).
