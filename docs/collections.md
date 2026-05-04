# Collections

```ts
import {
  findBy,
  findById,
  where,
  extract,
  partition,
  pluck,
} from 'op-array/collections';
```

## `findBy(collection, key, value)`

Finds the first item where the value at `key` (dot-delimited for nested
paths) equals `value`.

```ts
findBy([{ id: 1 }, { id: 2 }], 'id', 2);
// { id: 2 }

findBy(
  [{ user: { name: 'Ana' } }, { user: { name: 'Bo' } }],
  'user.name',
  'Bo',
);
// { user: { name: 'Bo' } }
```

## `findById(collection, value)`

Shortcut for `findBy(collection, 'id', value)`.

```ts
findById([{ id: 1 }, { id: 2 }], 2); // { id: 2 }
```

## `where(collection, key, value)`

Returns every matching item.

```ts
where(
  [{ role: 'admin' }, { role: 'user' }, { role: 'admin' }],
  'role',
  'admin',
);
// [{ role: 'admin' }, { role: 'admin' }]
```

## `extract(collection, keys)`

Projects every item down to the listed keys.

```ts
extract(
  [{ id: 1, name: 'Ana', email: 'a@x' }],
  ['id', 'name'],
);
// [{ id: 1, name: 'Ana' }]
```

## `pluck(collection, key)`

Projects every item down to the value at `key` (dot-delimited for
nested paths). Missing paths resolve to `undefined`. Empty input
returns `[]`.

```ts
pluck([{ id: 1 }, { id: 2 }], 'id');
// [1, 2]

pluck(
  [{ user: { name: 'Ana' } }, { user: { name: 'Bo' } }],
  'user.name',
);
// ['Ana', 'Bo']
```

## `partition(collection, predicate)`

Splits the collection into two arrays in a single pass. Items for which
`predicate` returns `true` go into `pass`, the rest into `fail`. The
predicate must return a boolean — truthy/falsy values are not coerced.
Empty input returns `{ pass: [], fail: [] }`.

```ts
partition([1, 2, 3, 4], (n) => n % 2 === 0);
// { pass: [2, 4], fail: [1, 3] }

const { pass: adults, fail: minors } = partition(
  users,
  (u) => u.age >= 18,
);
```
