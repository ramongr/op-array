import { describe, expect, test } from 'vitest';
import {
  equals,
  except,
  exists,
  existsAll,
  existsAny,
  intersection,
  symmetricDifference,
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

describe('existsAny', () => {
  test('returns true when at least one item is present', () => {
    expect(existsAny([1, 2, 3], [4, 2])).toBe(true);
  });

  test('returns false when no item is present', () => {
    expect(existsAny([1, 2, 3], [4, 5])).toBe(false);
  });

  test('returns false on empty source', () => {
    expect(existsAny<number>([], [1])).toBe(false);
  });

  test('returns false on empty items', () => {
    expect(existsAny([1], [])).toBe(false);
  });
});

describe('equals', () => {
  test('returns true for arrays with the same elements in any order', () => {
    expect(equals([1, 2, 3], [3, 2, 1])).toBe(true);
  });

  test('returns true ignoring duplicates (set semantics)', () => {
    expect(equals([1, 2], [1, 2, 2])).toBe(true);
  });

  test('returns false when distinct elements differ', () => {
    expect(equals([1, 2], [1, 3])).toBe(false);
  });

  test('returns true for two empty arrays', () => {
    expect(equals<number>([], [])).toBe(true);
  });

  test('returns false when only one side is empty', () => {
    expect(equals<number>([], [1])).toBe(false);
    expect(equals<number>([1], [])).toBe(false);
  });
});

describe('symmetricDifference', () => {
  test('returns items present in exactly one of the inputs', () => {
    expect(symmetricDifference([1, 2, 3], [2, 3, 4])).toEqual([1, 4]);
  });

  test('preserves left-first then right ordering', () => {
    expect(symmetricDifference([3, 1, 5], [4, 1, 2])).toEqual([3, 5, 4, 2]);
  });

  test('collapses duplicates within each side', () => {
    expect(symmetricDifference([1, 1, 2], [2, 3, 3])).toEqual([1, 3]);
  });

  test('returns left when right is empty (deduped)', () => {
    expect(symmetricDifference([1, 2, 2], [])).toEqual([1, 2]);
  });

  test('returns right when left is empty (deduped)', () => {
    expect(symmetricDifference<number>([], [3, 3, 4])).toEqual([3, 4]);
  });

  test('returns [] for two empty arrays', () => {
    expect(symmetricDifference<number>([], [])).toEqual([]);
  });

  test('returns [] when arrays are set-equal', () => {
    expect(symmetricDifference([1, 2, 3], [3, 2, 1])).toEqual([]);
  });

  test('does not mutate inputs', () => {
    const left = [1, 2, 3];
    const right = [3, 4];
    symmetricDifference(left, right);
    expect(left).toEqual([1, 2, 3]);
    expect(right).toEqual([3, 4]);
  });
});
