import { describe, expect, test } from 'vitest';
import {
  addition,
  halfPoint,
  isEven,
  isOdd,
  multiplication,
  subtraction,
} from '../../src/shared/arithmetic.js';

describe('addition', () => {
  test('adds two positive numbers', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('handles negatives', () => {
    expect(addition(-2, 5)).toBe(3);
  });
});

describe('subtraction', () => {
  test('subtracts right from left', () => {
    expect(subtraction(10, 3)).toBe(7);
  });
});

describe('multiplication', () => {
  test('multiplies two numbers', () => {
    expect(multiplication(3, 4)).toBe(12);
  });
});

describe('halfPoint', () => {
  test('rounds odd lengths up', () => {
    expect(halfPoint(5)).toBe(3);
  });

  test('returns exact half for even lengths', () => {
    expect(halfPoint(6)).toBe(3);
  });
});

describe('isEven', () => {
  test('returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
  });

  test('returns false for odd numbers', () => {
    expect(isEven(3)).toBe(false);
  });
});

describe('isOdd', () => {
  test('returns true for odd numbers', () => {
    expect(isOdd(3)).toBe(true);
  });

  test('returns false for even numbers', () => {
    expect(isOdd(4)).toBe(false);
  });
});
