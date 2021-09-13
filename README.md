# OP Array

[![Maintainability](https://api.codeclimate.com/v1/badges/123da94caf5cc7178bec/maintainability)](https://codeclimate.com/github/ramongr/op-array/maintainability)
[![codecov](https://codecov.io/gh/ramongr/op-array/branch/main/graph/badge.svg?token=nWzOn3AxHs)](https://codecov.io/gh/ramongr/op-array)

Using the Array's prototype chain to add extra methods.

## Installation

Install the npm package

```shell
yarn add op-array
```
or

```shell
npm install op-array
```

## How to use

```javascript
// findBy, findById, where
import 'op-array/dist/collections';
// For operations like: intersection, existance...
import 'op-array/dist/logical';
// For operations like: min, max, sum...
import 'op-array/dist/numerical';
// Adds first, second and last as array properties
import 'op-array/dist/positional';
// For operations like: unique, flat, inGroups...
import 'op-array/dist/transformations';
```

## Functions - Collections

[Click here to see examples](docs/collections.md)

## Functions - Logical

[Click here to see examples](docs/logical.md)

## Functions - Numerical

[Click here to see examples](docs/numerical.md)

## Functions - Positional

[Click here to see examples](docs/positional.md)

## Functions - Transformations

[Click here to see examples](docs/transformations.md)