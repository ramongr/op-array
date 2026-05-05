import { describe, expect, test } from 'vitest';
import {
  average,
  cumulativeSum,
  hasEvenLength,
  max,
  median,
  min,
  minBy,
  mode,
  product,
  quantile,
  range,
  standardDeviation,
  subtract,
  sum,
  variance,
} from '../../src/numerical/index.js';

describe('min', () => {
  test('returns the smallest value', () => {
    expect(min([3, 1, 2])).toBe(1);
  });
});

describe('max', () => {
  test('returns the largest value', () => {
    expect(max([3, 1, 2])).toBe(3);
  });
});

describe('sum', () => {
  test('adds all values', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  test('returns 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });
});

describe('subtract', () => {
  test('left-folds subtraction', () => {
    expect(subtract([10, 3, 2])).toBe(5);
  });

  test('throws on empty array', () => {
    expect(() => subtract([])).toThrow(TypeError);
  });
});

describe('product', () => {
  test('multiplies all values', () => {
    expect(product([2, 3, 4])).toBe(24);
  });

  test('throws on empty array', () => {
    expect(() => product([])).toThrow(TypeError);
  });
});

describe('average', () => {
  test('returns the arithmetic mean', () => {
    expect(average([2, 4, 6])).toBe(4);
  });

  test('returns NaN for empty array', () => {
    expect(average([])).toBeNaN();
  });
});

describe('hasEvenLength', () => {
  test('true for even lengths', () => {
    expect(hasEvenLength([1, 2])).toBe(true);
  });

  test('false for odd lengths', () => {
    expect(hasEvenLength([1, 2, 3])).toBe(false);
  });
});

describe('median', () => {
  test('returns middle value for odd length', () => {
    expect(median([3, 1, 2])).toBe(2);
  });

  test('averages middle two for even length', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  test('sorts numerically (not lexicographically)', () => {
    expect(median([10, 2, 1])).toBe(2);
  });

  test('does not mutate the input', () => {
    const input = [3, 1, 2];
    median(input);
    expect(input).toEqual([3, 1, 2]);
  });

  test('throws on empty array', () => {
    expect(() => median([])).toThrow(TypeError);
  });
});

describe('mode', () => {
  test('returns the single most-frequent value', () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
  });

  test('returns all values tied for the highest count', () => {
    expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
  });

  test('returns [] on empty input', () => {
    expect(mode<number>([])).toEqual([]);
  });
});

describe('range', () => {
  test('returns max minus min', () => {
    expect(range([1, 5, 3, 9, 2])).toBe(8);
  });

  test('returns 0 for a single-element array', () => {
    expect(range([42])).toBe(0);
  });

  test('handles negative numbers', () => {
    expect(range([-5, -1, -3])).toBe(4);
  });

  test('handles mixed positive and negative numbers', () => {
    expect(range([-3, 0, 7])).toBe(10);
  });

  test('returns 0 when all values are equal', () => {
    expect(range([4, 4, 4])).toBe(0);
  });

  test('throws on empty array', () => {
    expect(() => range([])).toThrow(TypeError);
  });

  test('propagates NaN (matches Math.min/Math.max)', () => {
    expect(range([1, Number.NaN, 3])).toBeNaN();
    expect(range([Number.NaN, 1, 2])).toBeNaN();
    expect(range([1, 2, Number.NaN])).toBeNaN();
  });

  test('does not mutate the input', () => {
    const input = [3, 1, 2];
    range(input);
    expect(input).toEqual([3, 1, 2]);
  });
});

describe('variance', () => {
  test('population variance by default', () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4);
  });

  test('sample variance with mode = "sample"', () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9], 'sample')).toBeCloseTo(
      4.571428571428571,
      12,
    );
  });

  test('returns 0 for a constant population', () => {
    expect(variance([3, 3, 3])).toBe(0);
  });

  test('returns 0 for a single value (population)', () => {
    expect(variance([5])).toBe(0);
  });

  test('throws on empty array', () => {
    expect(() => variance([])).toThrow(TypeError);
    expect(() => variance([], 'sample')).toThrow(TypeError);
  });

  test('throws on single value when mode = "sample"', () => {
    expect(() => variance([5], 'sample')).toThrow(TypeError);
  });

  test('propagates NaN (matches range/min/max)', () => {
    expect(variance([1, Number.NaN, 3])).toBeNaN();
    expect(variance([1, 2, Number.NaN], 'sample')).toBeNaN();
  });

  test('does not mutate the input', () => {
    const input = [2, 4, 4, 4, 5, 5, 7, 9];
    variance(input, 'sample');
    expect(input).toEqual([2, 4, 4, 4, 5, 5, 7, 9]);
  });
});

describe('standardDeviation', () => {
  test('population standard deviation by default', () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });

  test('sample standard deviation with mode = "sample"', () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], 'sample')).toBeCloseTo(
      Math.sqrt(32 / 7),
      12,
    );
  });

  test('returns 0 for a constant population', () => {
    expect(standardDeviation([3, 3, 3])).toBe(0);
  });

  test('returns 0 for a single value (population)', () => {
    expect(standardDeviation([5])).toBe(0);
  });

  test('throws on empty array', () => {
    expect(() => standardDeviation([])).toThrow(TypeError);
    expect(() => standardDeviation([], 'sample')).toThrow(TypeError);
  });

  test('throws on single value when mode = "sample"', () => {
    expect(() => standardDeviation([5], 'sample')).toThrow(TypeError);
  });

  test('propagates NaN', () => {
    expect(standardDeviation([1, Number.NaN, 3])).toBeNaN();
  });

  test('does not mutate the input', () => {
    const input = [2, 4, 4, 4, 5, 5, 7, 9];
    standardDeviation(input, 'sample');
    expect(input).toEqual([2, 4, 4, 4, 5, 5, 7, 9]);
  });
});

describe('quantile', () => {
  test('q = 0.5 matches the median (odd length)', () => {
    expect(quantile([3, 1, 2], 0.5)).toBe(2);
  });

  test('q = 0.5 matches the median (even length, interpolated)', () => {
    expect(quantile([1, 2, 3, 4], 0.5)).toBe(2.5);
  });

  test('linear interpolation between adjacent ordered values', () => {
    expect(quantile([1, 2, 3, 4], 0.25)).toBe(1.75);
    expect(quantile([1, 2, 3, 4], 0.75)).toBe(3.25);
  });

  test('q = 0 returns the minimum, q = 1 returns the maximum', () => {
    expect(quantile([5, 1, 9, 3], 0)).toBe(1);
    expect(quantile([5, 1, 9, 3], 1)).toBe(9);
  });

  test('single element returns that value for any q', () => {
    expect(quantile([42], 0)).toBe(42);
    expect(quantile([42], 0.3)).toBe(42);
    expect(quantile([42], 1)).toBe(42);
  });

  test('sorts numerically, not lexicographically', () => {
    expect(quantile([10, 2, 1], 0.5)).toBe(2);
  });

  test('throws TypeError on empty input', () => {
    expect(() => quantile([], 0.5)).toThrow(TypeError);
  });

  test('throws RangeError when q is outside [0, 1]', () => {
    expect(() => quantile([1, 2, 3], -0.1)).toThrow(RangeError);
    expect(() => quantile([1, 2, 3], 1.1)).toThrow(RangeError);
  });

  test('throws RangeError when q is NaN', () => {
    expect(() => quantile([1, 2, 3], Number.NaN)).toThrow(RangeError);
  });

  test('propagates NaN in the input', () => {
    expect(quantile([1, Number.NaN, 3], 0.5)).toBeNaN();
  });

  test('does not mutate the input', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    quantile(input, 0.5);
    expect(input).toEqual([3, 1, 4, 1, 5, 9, 2, 6]);
  });

  test('treats -0 and 0 as equal (matches min/median signed-zero behaviour)', () => {
    // Whichever zero ends up at index 0 after a numeric sort is engine-
    // defined; both are valid representations of zero and compare equal.
    expect(quantile([-0, 0], 0)).toBe(0);
    expect(quantile([-0, 0], 1)).toBe(0);
    expect(quantile([-0, 0], 0.5)).toBe(0);
  });
});

describe('cumulativeSum', () => {
  test('returns running totals', () => {
    expect(cumulativeSum([1, 2, 3, 4])).toEqual([1, 3, 6, 10]);
  });

  test('returns [] for empty input', () => {
    expect(cumulativeSum([])).toEqual([]);
  });

  test('output length equals input length', () => {
    expect(cumulativeSum([5]).length).toBe(1);
    expect(cumulativeSum([1, 2, 3, 4, 5]).length).toBe(5);
  });

  test('single element returns that element wrapped', () => {
    expect(cumulativeSum([42])).toEqual([42]);
  });

  test('handles negative numbers', () => {
    expect(cumulativeSum([1, -2, 3, -4])).toEqual([1, -1, 2, -2]);
  });

  test('handles zeros', () => {
    expect(cumulativeSum([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('NaN poisons the current and all subsequent positions', () => {
    const result = cumulativeSum([1, 2, Number.NaN, 4]);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(3);
    expect(result[2]).toBeNaN();
    expect(result[3]).toBeNaN();
  });

  test('Infinity + -Infinity yields NaN at and beyond that position', () => {
    const result = cumulativeSum([1, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 4]);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(Number.POSITIVE_INFINITY);
    expect(result[2]).toBeNaN();
    expect(result[3]).toBeNaN();
  });

  test('does not mutate the input', () => {
    const input = [1, 2, 3, 4];
    cumulativeSum(input);
    expect(input).toEqual([1, 2, 3, 4]);
  });
});

describe('minBy', () => {
  test('returns the item with the smallest value at the key', () => {
    const items = [{ price: 9 }, { price: 3 }, { price: 7 }];
    expect(minBy(items, 'price')).toEqual({ price: 3 });
  });

  test('resolves dot-delimited nested paths', () => {
    const users = [
      { name: 'Ana', profile: { age: 30 } },
      { name: 'Bob', profile: { age: 22 } },
      { name: 'Cid', profile: { age: 41 } },
    ];
    expect(minBy(users, 'profile.age')).toEqual({
      name: 'Bob',
      profile: { age: 22 },
    });
  });

  test('returns undefined for empty input', () => {
    expect(minBy([], 'price')).toBeUndefined();
  });

  test('first occurrence wins on ties', () => {
    const items = [
      { id: 'a', n: 5 },
      { id: 'b', n: 1 },
      { id: 'c', n: 1 },
    ];
    expect(minBy(items, 'n')).toEqual({ id: 'b', n: 1 });
  });

  test('excludes items where the path is missing', () => {
    const items = [{ price: 5 }, { name: 'no-price' }, { price: 2 }];
    expect(minBy(items, 'price')).toEqual({ price: 2 });
  });

  test('excludes items whose value is not a number', () => {
    const items = [
      { price: '3' },
      { price: 5 },
      { price: null },
      { price: 2 },
    ];
    expect(minBy(items, 'price')).toEqual({ price: 2 });
  });

  test('excludes NaN values', () => {
    const items = [{ n: Number.NaN }, { n: 4 }, { n: Number.NaN }];
    expect(minBy(items, 'n')).toEqual({ n: 4 });
  });

  test('returns undefined when no item has a comparable numeric value', () => {
    const items = [{ price: null }, { price: '3' }, {}];
    expect(minBy(items, 'price')).toBeUndefined();
  });

  test('handles negative numbers and zero', () => {
    const items = [{ n: -1 }, { n: 0 }, { n: -5 }, { n: 3 }];
    expect(minBy(items, 'n')).toEqual({ n: -5 });
  });

  test('does not mutate the input', () => {
    const items = [{ n: 3 }, { n: 1 }, { n: 2 }];
    const snapshot = [...items];
    minBy(items, 'n');
    expect(items).toEqual(snapshot);
  });
});
