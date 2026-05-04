import { describe, expect, test } from 'vitest';
import { first, last, second, third } from '../../src/positional/index.js';

describe('first', () => {
  test('returns the first element', () => {
    expect(first([10, 20, 30])).toBe(10);
  });

  test('returns undefined for empty array', () => {
    expect(first<number>([])).toBeUndefined();
  });
});

describe('second', () => {
  test('returns the second element', () => {
    expect(second([10, 20, 30])).toBe(20);
  });

  test('returns undefined when not present', () => {
    expect(second([10])).toBeUndefined();
  });
});

describe('third', () => {
  test('returns the third element', () => {
    expect(third([10, 20, 30])).toBe(30);
  });

  test('returns undefined when not present', () => {
    expect(third([10, 20])).toBeUndefined();
  });
});

describe('last', () => {
  test('returns the last element', () => {
    expect(last([10, 20, 30])).toBe(30);
  });

  test('returns undefined for empty array', () => {
    expect(last<number>([])).toBeUndefined();
  });
});
