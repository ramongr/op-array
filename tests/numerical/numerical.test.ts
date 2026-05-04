import { describe, expect, test } from 'vitest';
import {
  average,
  hasEvenLength,
  max,
  median,
  min,
  mode,
  product,
  subtract,
  sum,
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
