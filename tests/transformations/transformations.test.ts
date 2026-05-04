import { describe, expect, test } from 'vitest';
import {
  compact,
  compactNullish,
  flat,
  inGroups,
  inGroupsOf,
  occurrences,
  unique,
  uniqueBy,
} from '../../src/transformations/index.js';

describe('unique', () => {
  test('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  test('returns empty for empty input', () => {
    expect(unique<number>([])).toEqual([]);
  });
});

describe('uniqueBy', () => {
  test('dedupes by a top-level key, first occurrence wins', () => {
    const users = [
      { id: 1, name: 'Ana' },
      { id: 2, name: 'Bo' },
      { id: 1, name: 'Ana 2' },
    ];
    expect(uniqueBy(users, 'id')).toEqual([users[0], users[1]]);
  });

  test('dedupes by a nested dot-delimited path', () => {
    const orders = [
      { id: 1, customer: { email: 'a@x' } },
      { id: 2, customer: { email: 'b@x' } },
      { id: 3, customer: { email: 'a@x' } },
    ];
    expect(uniqueBy(orders, 'customer.email')).toEqual([
      orders[0],
      orders[1],
    ]);
  });

  test('collapses items missing the path into a single bucket', () => {
    const items = [{ id: 1 }, {}, { id: 2 }, {}];
    expect(uniqueBy(items, 'id')).toEqual([items[0], items[1], items[2]]);
  });

  test('returns [] for empty input', () => {
    expect(uniqueBy<{ id: number }>([], 'id')).toEqual([]);
  });
});

describe('flat', () => {
  test('flattens one level by default', () => {
    expect(flat([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  test('handles a single-element nested array (v1 bug regression)', () => {
    expect(flat([[1, 2]])).toEqual([1, 2]);
  });

  test('returns [] for empty input', () => {
    expect(flat([])).toEqual([]);
  });

  test('respects depth parameter', () => {
    expect(flat([[1, [2, [3]]]], 2)).toEqual([1, 2, [3]]);
  });
});

describe('inGroups', () => {
  test('splits into the requested number of groups', () => {
    expect(inGroups([1, 2, 3, 4, 5], 2)).toEqual([[1, 2, 3], [4, 5]]);
  });

  test('produces empty trailing groups when shorter than count', () => {
    expect(inGroups([1, 2, 3], 5)).toEqual([[1], [2], [3], [], []]);
  });

  test('throws on non-positive count', () => {
    expect(() => inGroups([1, 2], 0)).toThrow(RangeError);
  });
});

describe('inGroupsOf', () => {
  test('splits into groups of the given size', () => {
    expect(inGroupsOf([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('returns empty array for empty input', () => {
    expect(inGroupsOf<number>([], 3)).toEqual([]);
  });

  test('throws on non-positive size', () => {
    expect(() => inGroupsOf([1], 0)).toThrow(RangeError);
  });
});

describe('occurrences', () => {
  test('counts each value preserving insertion order', () => {
    expect(occurrences([1, 2, 2, 3])).toEqual([
      [1, 1],
      [2, 2],
      [3, 1],
    ]);
  });

  test('returns empty for empty input', () => {
    expect(occurrences<string>([])).toEqual([]);
  });
});

describe('compact', () => {
  test('removes all falsy values including 0, false, NaN', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([
      1, 2, 3,
    ]);
  });
});

describe('compactNullish', () => {
  test('removes only null and undefined', () => {
    expect(compactNullish([0, 1, null, '', undefined, false])).toEqual([
      0,
      1,
      '',
      false,
    ]);
  });
});
