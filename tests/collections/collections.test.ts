import { describe, expect, test } from 'vitest';
import {
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
