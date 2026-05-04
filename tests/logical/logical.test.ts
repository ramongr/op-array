import { describe, expect, test } from 'vitest';
import {
  except,
  exists,
  existsAll,
  intersection,
  union,
} from '../../src/logical/index.js';

describe('intersection', () => {
  test('returns elements present in both arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  test('returns empty array when no overlap exists', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  test('preserves duplicates from the first array', () => {
    expect(intersection([1, 2, 2, 3], [2, 3])).toEqual([2, 2, 3]);
  });
});

describe('except', () => {
  test('removes excluded elements', () => {
    expect(except([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  test('returns the source unchanged when no exclusions match', () => {
    expect(except([1, 2, 3], [9])).toEqual([1, 2, 3]);
  });

  test('returns empty when all source elements are excluded', () => {
    expect(except([1, 2], [1, 2])).toEqual([]);
  });
});

describe('union', () => {
  test('combines arrays and removes duplicates', () => {
    expect(union([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('preserves order of first appearance', () => {
    expect(union([3, 1], [2, 3])).toEqual([3, 1, 2]);
  });
});

describe('exists', () => {
  test('returns true when item is present', () => {
    expect(exists([1, 2, 3], 2)).toBe(true);
  });

  test('returns false when item is absent', () => {
    expect(exists([1, 2, 3], 9)).toBe(false);
  });

  test('returns false on empty source', () => {
    expect(exists<number>([], 1)).toBe(false);
  });
});

describe('existsAll', () => {
  test('returns true when every item is present', () => {
    expect(existsAll([1, 2, 3, 4], [1, 3])).toBe(true);
  });

  test('returns false when at least one item is missing', () => {
    expect(existsAll([1, 2, 3], [1, 9])).toBe(false);
  });

  test('returns false when source is empty regardless of items', () => {
    expect(existsAll<number>([], [])).toBe(false);
    expect(existsAll<number>([], [1])).toBe(false);
  });

  test('returns true vacuously for empty items on non-empty source', () => {
    expect(existsAll([1], [])).toBe(true);
  });
});
