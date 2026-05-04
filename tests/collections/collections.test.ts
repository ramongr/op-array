import { describe, expect, test } from 'vitest';
import {
  extract,
  findBy,
  findById,
  groupBy,
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
