import { describe, expect, test } from 'vitest';
import {
  countBy,
  extract,
  findBy,
  findById,
  groupBy,
  keyBy,
  partition,
  pluck,
  where,
} from '../../src/collections/index.js';

describe('findBy', () => {
  const users = [
    { id: 1, profile: { name: 'Ana' } },
    { id: 2, profile: { name: 'Bo' } },
  ];

  test('finds by a top-level key', () => {
    expect(findBy(users, 'id', 2)).toEqual(users[1]);
  });

  test('finds by a nested dot-delimited key', () => {
    expect(findBy(users, 'profile.name', 'Ana')).toEqual(users[0]);
  });

  test('returns undefined when no match exists', () => {
    expect(findBy(users, 'id', 99)).toBeUndefined();
  });
});

describe('findById', () => {
  const users = [{ id: 1 }, { id: 2 }];

  test('returns the item with matching id', () => {
    expect(findById(users, 2)).toEqual({ id: 2 });
  });

  test('returns undefined when no id matches', () => {
    expect(findById(users, 99)).toBeUndefined();
  });
});

describe('where', () => {
  const users = [
    { role: 'admin' },
    { role: 'user' },
    { role: 'admin' },
  ];

  test('returns all matching items', () => {
    expect(where(users, 'role', 'admin')).toEqual([
      { role: 'admin' },
      { role: 'admin' },
    ]);
  });

  test('returns an empty array when nothing matches', () => {
    expect(where(users, 'role', 'guest')).toEqual([]);
  });

  test('matches by a nested dot-delimited key', () => {
    const records = [
      { profile: { country: 'PT' } },
      { profile: { country: 'US' } },
      { profile: { country: 'PT' } },
    ];
    expect(where(records, 'profile.country', 'PT')).toEqual([
      records[0],
      records[2],
    ]);
  });

  test('returns [] when the path is missing on every item', () => {
    expect(where([{ a: 1 }, { a: 2 }], 'b.c', 1)).toEqual([]);
  });
});

describe('extract', () => {
  const users = [
    { id: 1, name: 'Ana', email: 'a@x' },
    { id: 2, name: 'Bo', email: 'b@x' },
  ];

  test('keeps only the requested keys', () => {
    expect(extract(users, ['id', 'name'])).toEqual([
      { id: 1, name: 'Ana' },
      { id: 2, name: 'Bo' },
    ]);
  });
});

describe('pluck', () => {
  test('projects a top-level key', () => {
    expect(pluck([{ id: 1 }, { id: 2 }], 'id')).toEqual([1, 2]);
  });

  test('projects a nested dot-delimited path', () => {
    expect(
      pluck(
        [{ user: { name: 'Ana' } }, { user: { name: 'Bo' } }],
        'user.name',
      ),
    ).toEqual(['Ana', 'Bo']);
  });

  test('returns undefined for items missing the path', () => {
    expect(pluck([{ id: 1 }, {}], 'id')).toEqual([1, undefined]);
  });

  test('returns [] for empty input', () => {
    expect(pluck<{ id: number }>([], 'id')).toEqual([]);
  });
});

describe('keyBy', () => {
  test('indexes by a top-level key', () => {
    expect(keyBy([{ id: 'a' }, { id: 'b' }], 'id')).toEqual({
      a: { id: 'a' },
      b: { id: 'b' },
    });
  });

  test('indexes by a nested dot-delimited path', () => {
    const users = [
      { profile: { email: 'a@x' }, name: 'Ana' },
      { profile: { email: 'b@x' }, name: 'Bo' },
    ];
    expect(keyBy(users, 'profile.email')).toEqual({
      'a@x': users[0],
      'b@x': users[1],
    });
  });

  test('last item wins on duplicate keys', () => {
    expect(
      keyBy(
        [
          { id: 'a', n: 1 },
          { id: 'a', n: 2 },
        ],
        'id',
      ),
    ).toEqual({ a: { id: 'a', n: 2 } });
  });

  test('buckets missing paths under the string "undefined"', () => {
    expect(keyBy([{ id: 'a' }, {}], 'id')).toEqual({
      a: { id: 'a' },
      undefined: {},
    });
  });

  test('returns {} for empty input', () => {
    expect(keyBy<{ id: string }>([], 'id')).toEqual({});
  });
});

describe('groupBy', () => {
  test('groups by a top-level key', () => {
    const orders = [
      { id: 1, status: 'paid' },
      { id: 2, status: 'refunded' },
      { id: 3, status: 'paid' },
    ];
    expect(groupBy(orders, 'status')).toEqual({
      paid: [orders[0], orders[2]],
      refunded: [orders[1]],
    });
  });

  test('groups by a nested dot-delimited path', () => {
    const users = [
      { name: 'Ana', address: { country: 'PT' } },
      { name: 'Bo', address: { country: 'US' } },
      { name: 'Cy', address: { country: 'PT' } },
    ];
    expect(groupBy(users, 'address.country')).toEqual({
      PT: [users[0], users[2]],
      US: [users[1]],
    });
  });

  test('preserves first-seen order of group keys', () => {
    const items = [
      { k: 'b' },
      { k: 'a' },
      { k: 'b' },
      { k: 'a' },
    ];
    expect(Object.keys(groupBy(items, 'k'))).toEqual(['b', 'a']);
  });

  test('buckets missing paths under the string "undefined"', () => {
    expect(groupBy([{ id: 'a' }, {}], 'id')).toEqual({
      a: [{ id: 'a' }],
      undefined: [{}],
    });
  });

  test('returns {} for empty input', () => {
    expect(groupBy<{ id: string }>([], 'id')).toEqual({});
  });
});

describe('countBy', () => {
  test('counts by a top-level key', () => {
    const orders = [
      { status: 'paid' },
      { status: 'refunded' },
      { status: 'paid' },
      { status: 'paid' },
    ];
    expect(countBy(orders, 'status')).toEqual({ paid: 3, refunded: 1 });
  });

  test('counts by a nested dot-delimited path', () => {
    const users = [
      { address: { country: 'PT' } },
      { address: { country: 'US' } },
      { address: { country: 'PT' } },
    ];
    expect(countBy(users, 'address.country')).toEqual({ PT: 2, US: 1 });
  });

  test('counts missing paths under the string "undefined"', () => {
    expect(countBy([{ id: 'a' }, {}, {}], 'id')).toEqual({
      a: 1,
      undefined: 2,
    });
  });

  test('returns {} for empty input', () => {
    expect(countBy<{ id: string }>([], 'id')).toEqual({});
  });
});

describe('partition', () => {
  test('splits items by predicate into pass / fail buckets', () => {
    expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual({
      pass: [2, 4],
      fail: [1, 3],
    });
  });

  test('passes the index to the predicate', () => {
    expect(
      partition(['a', 'b', 'c', 'd'], (_item, index) => index < 2),
    ).toEqual({ pass: ['a', 'b'], fail: ['c', 'd'] });
  });

  test('returns both buckets empty for empty input', () => {
    expect(partition<number>([], (n) => n > 0)).toEqual({
      pass: [],
      fail: [],
    });
  });

  test('preserves source order within each bucket', () => {
    const items = [3, 1, 4, 1, 5, 9, 2, 6];
    const { pass, fail } = partition(items, (n) => n > 2);
    expect(pass).toEqual([3, 4, 5, 9, 6]);
    expect(fail).toEqual([1, 1, 2]);
  });

  test('does not mutate the input', () => {
    const input = [1, 2, 3];
    partition(input, (n) => n > 1);
    expect(input).toEqual([1, 2, 3]);
  });
});
