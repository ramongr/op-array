import { describe, expect, test } from 'vitest';
import {
  extract,
  findBy,
  findById,
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
