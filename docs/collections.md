# Collections

```ts
import {
  findBy,
  findById,
  where,
  extract,
  groupBy,
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

## `groupBy(collection, key)`

Groups items by the value at `key` (dot-delimited for nested paths).
Group order is the first-seen order of each bucket. Missing paths
bucket under the string `'undefined'`. Empty input returns `{}`.

```ts
groupBy(orders, 'status');
// { paid: [...], refunded: [...] }

groupBy(users, 'address.country');
```
