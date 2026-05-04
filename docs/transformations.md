# Transformations

```ts
import {
  unique,
  uniqueBy,
  flat,
  inGroups,
  inGroupsOf,
  occurrences,
  compact,
  compactNullish,
} from 'op-array/transformations';
```

## `unique(values)`

```ts
unique([1, 2, 2, 3, 1]); // [1, 2, 3]
```

## `uniqueBy(values, key)`

Dedupes by the value at `key` (dot-delimited for nested paths). First
occurrence per resolved key wins, preserving order. Items missing the
path collapse to a single `undefined` bucket. Empty input returns `[]`.

```ts
uniqueBy(users, 'id');
uniqueBy(orders, 'customer.email');
```

## `flat(values, depth = 1)`

Mirrors native `Array.prototype.flat` while accepting `readonly` inputs.

```ts
flat([[1, 2], [3, [4]]]);   // [1, 2, 3, [4]]
flat([[1, [2, [3]]]], 2);   // [1, 2, [3]]
```

## `inGroups(values, groupCount)`

Splits into exactly `groupCount` contiguous groups. Throws `RangeError`
on a non-positive `groupCount`.

```ts
inGroups([1, 2, 3, 4, 5], 2); // [[1, 2, 3], [4, 5]]
inGroups([1, 2, 3], 5);       // [[1], [2], [3], [], []]
```

## `inGroupsOf(values, size)`

Splits into groups of `size` consecutive elements. Throws `RangeError`
on a non-positive `size`.

```ts
inGroupsOf([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## `occurrences(values)`

```ts
occurrences([1, 2, 2, 3]); // [[1, 1], [2, 2], [3, 1]]
```

## `compact(values)`

Removes all falsy values: `false`, `0`, `0n`, `''`, `null`, `undefined`,
`NaN`. Mirrors `lodash.compact`.

```ts
compact([0, 1, false, 2, '', 3, null, NaN]); // [1, 2, 3]
```

## `compactNullish(values)`

Removes only `null` / `undefined`.

```ts
compactNullish([0, 1, null, '', undefined]); // [0, 1, '']
```
