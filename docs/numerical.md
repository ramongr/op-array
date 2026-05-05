# Numerical

```ts
import {
  min,
  max,
  sum,
  subtract,
  product,
  average,
  hasEvenLength,
  median,
  mode,
  range,
  variance,
  standardDeviation,
  quantile,
  cumulativeSum,
  minBy,
  maxBy,
  sumBy,
  averageBy,
} from 'op-array/numerical';
```

## `min(values)` / `max(values)`

```ts
min([3, 1, 2]); // 1
max([3, 1, 2]); // 3
```

## `sum(values)`

Returns `0` for empty arrays.

```ts
sum([1, 2, 3]); // 6
```

## `subtract(values)`

Left-folds subtraction. **Throws `TypeError`** on empty input.

```ts
subtract([10, 3, 2]); // 5
```

## `product(values)`

**Throws `TypeError`** on empty input.

```ts
product([2, 3, 4]); // 24
```

## `average(values)`

Returns `NaN` on empty input (consistent with `0 / 0`).

```ts
average([2, 4, 6]); // 4
```

## `hasEvenLength(values)`

```ts
hasEvenLength([1, 2]);    // true
hasEvenLength([1, 2, 3]); // false
```

## `median(values)`

Numeric sort, does not mutate the input. Even-length arrays return the
mean of the two middle values. **Throws `TypeError`** on empty input.

```ts
median([3, 1, 2]);    // 2
median([1, 2, 3, 4]); // 2.5
median([10, 2, 1]);   // 2  (numeric sort, not lexicographic)
```

## `mode(values)`

Returns every value tied for the highest occurrence count, in first-seen
order. Returns `[]` for empty input.

```ts
mode([1, 2, 2, 3]);     // [2]
mode([1, 1, 2, 2, 3]);  // [1, 2]
```

## `range(values)`

Difference between the largest and smallest value (a.k.a. extent or
spread). Single pass. Single-element input returns `0`. Any `NaN` in
the input propagates to the result (matches `Math.min` / `Math.max`).
**Throws `TypeError`** on empty input.

```ts
range([1, 5, 3, 9, 2]); // 8
range([42]);            // 0
```

## `variance(values, mode?)`

Variance of the values. Two-pass algorithm (mean, then average of
squared deviations).

- `mode = 'population'` (default) divides by `n` (σ²).
- `mode = 'sample'` divides by `n − 1` (s², Bessel's correction).
- Any `NaN` in the input propagates to the result (matches `range`).

**Throws `TypeError`** on empty input, or on single-element input when
`mode === 'sample'`.

```ts
variance([2, 4, 4, 4, 5, 5, 7, 9]);           // 4
variance([2, 4, 4, 4, 5, 5, 7, 9], 'sample'); // ≈ 4.5714…
variance([5]);                                // 0  (population)
```

## `standardDeviation(values, mode?)`

Square root of `variance(values, mode)`. Same `'population'` /
`'sample'` modes and same throw conditions. Any `NaN` in the input
propagates to the result.

```ts
standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);           // 2
standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], 'sample'); // ≈ 2.1380…
```

## `quantile(values, q)`

Quantile of `values` using linear interpolation between adjacent
ordered values (the "R-7" / Excel / NumPy-default method, which
generalises `median` so that `quantile(values, 0.5)` agrees with
`median(values)`).

- `q = 0` returns the minimum, `q = 1` the maximum.
- Sorts numerically, does not mutate the input.
- Any `NaN` in the input propagates to the result (matches `variance`
  and `standardDeviation`).

**Throws `TypeError`** on empty input. **Throws `RangeError`** when
`q` is outside `[0, 1]` or is `NaN`.

```ts
quantile([1, 2, 3, 4], 0.5);  // 2.5
quantile([1, 2, 3, 4], 0.25); // 1.75
quantile([1, 2, 3, 4], 0.75); // 3.25
quantile([1, 2, 3, 4], 0);    // 1
quantile([1, 2, 3, 4], 1);    // 4
```

## `cumulativeSum(values)`

Running totals: returns an array of the same length where each element
is the sum of all input values up to and including that index. Returns
`[]` for empty input. Any `NaN` poisons that position and every
subsequent position.

```ts
cumulativeSum([1, 2, 3, 4]); // [1, 3, 6, 10]
cumulativeSum([]);           // []
```

## `minBy(collection, key)`

Returns the item with the smallest numeric value at `key`
(dot-delimited for nested paths), or `undefined` when no item has a
comparable numeric value. Returns the source item, not the resolved
numeric value. Empty input returns `undefined`. Ties resolve to the
first occurrence. Items where the resolved value is missing, `NaN`,
or not a `number` are excluded from comparison.

```ts
const products = [{ price: 9 }, { price: 3 }, { price: 7 }];
minBy(products, 'price'); // { price: 3 }

const users = [
  { name: 'Ana', profile: { age: 30 } },
  { name: 'Bob', profile: { age: 22 } },
];
minBy(users, 'profile.age'); // { name: 'Bob', profile: { age: 22 } }
```

## `maxBy(collection, key)`

Returns the item with the largest numeric value at `key`
(dot-delimited for nested paths), or `undefined` when no item has a
comparable numeric value. Returns the source item, not the resolved
numeric value. Empty input returns `undefined`. Ties resolve to the
first occurrence. Items where the resolved value is missing, `NaN`,
or not a `number` are excluded from comparison.

```ts
const products = [{ price: 9 }, { price: 3 }, { price: 7 }];
maxBy(products, 'price'); // { price: 9 }

const users = [
  { name: 'Ana', profile: { age: 30 } },
  { name: 'Bob', profile: { age: 22 } },
];
maxBy(users, 'profile.age'); // { name: 'Ana', profile: { age: 30 } }
```

## `sumBy(collection, key)`

Sum of the numeric values at `key` (dot-delimited for nested paths)
across every item in `collection`. Strict: any item where the
resolved value is missing or not a `number` throws `TypeError`. Empty
input returns `0` (matches `sum`). `NaN` propagates.

```ts
sumBy([{ total: 10 }, { total: 5 }], 'total'); // 15

const orders = [
  { shipping: { fee: 5 } },
  { shipping: { fee: 7.5 } },
];
sumBy(orders, 'shipping.fee'); // 12.5
```

## `averageBy(collection, key)`

Arithmetic mean of the numeric values at `key` (dot-delimited for
nested paths) across every item in `collection`. Strict: any item
where the resolved value is missing or not a `number` throws
`TypeError`. Empty input returns `NaN` (matches `average`,
consistent with `0 / 0`). `NaN` propagates.

```ts
averageBy([{ grade: 80 }, { grade: 90 }], 'grade'); // 85

const users = [
  { name: 'Ana', profile: { age: 20 } },
  { name: 'Bob', profile: { age: 40 } },
];
averageBy(users, 'profile.age'); // 30
```
