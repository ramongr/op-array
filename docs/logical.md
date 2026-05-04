# Logical

```ts
import {
  intersection,
  except,
  union,
  exists,
  existsAll,
  existsAny,
  equals,
  symmetricDifference,
  isSubset,
  isSuperset,
} from 'op-array/logical';
```

## `intersection(left, right)`

Elements present in both arrays. Order follows `left`. O(n + m).

```ts
intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
```

## `except(source, excluded)`

Elements of `source` not in `excluded`. O(n + m).

```ts
except([1, 2, 3, 4], [2, 4]); // [1, 3]
```

## `union(left, right)`

Combined elements without duplicates, in first-seen order.

```ts
union([1, 2, 3], [3, 4, 5]); // [1, 2, 3, 4, 5]
```

## `exists(source, item)`

```ts
exists([1, 2, 3], 2); // true
exists([], 2);        // false
```

## `existsAll(source, items)`

True when every element of `items` is in `source`. False if `source` is
empty.

```ts
existsAll([1, 2, 3], [1, 3]); // true
existsAll([1, 2, 3], [1, 9]); // false
existsAll([], [1]);           // false
```

## `existsAny(source, items)`

True when **any** element of `items` is in `source`. False if either
side is empty.

```ts
existsAny([1, 2, 3], [4, 2]); // true
existsAny([1, 2, 3], [4, 5]); // false
existsAny([], [1]);           // false
existsAny([1], []);           // false
```

## `equals(left, right)`

Set-equality. `true` when both arrays contain exactly the same distinct
elements regardless of order or duplicates. **Not** a deep equality
check. Element comparison uses `Set` (SameValueZero) semantics.

```ts
equals([1, 2, 3], [3, 2, 1]); // true
equals([1, 2], [1, 2, 2]);    // true  (set semantics)
equals([1, 2], [1, 3]);       // false
equals([], []);               // true
```

## `symmetricDifference(left, right)`

Items present in exactly one of `left` or `right` (xor). Left-first then
right ordering; duplicates collapsed via `Set`. O(n + m).

```ts
symmetricDifference([1, 2, 3], [2, 3, 4]); // [1, 4]
symmetricDifference([1, 1, 2], [2, 3, 3]); // [1, 3]
symmetricDifference([1, 2], [2, 1]);       // []
symmetricDifference([], []);               // []
```

## `isSubset(left, right)`

`true` when every distinct element of `left` is in `right`. Empty `left`
is vacuously a subset of any array (including `[]`). Element comparison
uses `Set` (SameValueZero) semantics. O(n + m).

```ts
isSubset([1, 2], [1, 2, 3]); // true
isSubset([1, 4], [1, 2, 3]); // false
isSubset([1, 2, 3], [3, 2, 1]); // true (set-equal)
isSubset([], [1, 2]);        // true
isSubset([1], []);           // false
```

## `isSuperset(left, right)`

`true` when every distinct element of `right` is in `left`, i.e. `left`
is a (non-strict) superset of `right`. Empty `right` is vacuously a
subset of any array, so any `left` is a superset of `[]`. Element
comparison uses `Set` (SameValueZero) semantics. O(n + m).

```ts
isSuperset([1, 2, 3], [1, 2]);    // true
isSuperset([1, 2, 3], [1, 4]);    // false
isSuperset([1, 2, 3], [3, 2, 1]); // true (set-equal)
isSuperset([1, 2], []);           // true
isSuperset([], [1]);              // false
```
