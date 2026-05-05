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
