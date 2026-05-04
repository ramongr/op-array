import { describe, expect, test } from 'vitest';
import {
  countBy,
  extract,
  findBy,
  findById,
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
