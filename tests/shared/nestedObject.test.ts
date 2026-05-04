import { describe, expect, test } from 'vitest';
import {
  nestedObjectValue,
  objectFromKeys,
} from '../../src/shared/nestedObject.js';

describe('nestedObjectValue', () => {
  test('returns value at a deep dot-delimited path', () => {
    expect(nestedObjectValue({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1);
  });

  test('returns the top-level value for a single segment', () => {
    expect(nestedObjectValue({ x: 42 }, 'x')).toBe(42);
  });

  test('returns undefined when a path segment is missing', () => {
    expect(nestedObjectValue({ a: 1 }, 'a.b.c')).toBeUndefined();
  });

  test('returns undefined when navigating through null', () => {
    expect(nestedObjectValue({ a: null }, 'a.b')).toBeUndefined();
  });
});

describe('objectFromKeys', () => {
  test('picks only the requested keys', () => {
    expect(objectFromKeys({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({
      a: 1,
      c: 3,
    });
  });

  test('returns an empty object when no keys are requested', () => {
    expect(objectFromKeys({ a: 1 }, [])).toEqual({});
  });
});
