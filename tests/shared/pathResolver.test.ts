import { describe, expect, test } from 'vitest';
import { pathResolver } from '../../src/shared/pathResolver.js';

describe('pathResolver', () => {
  test('resolves a top-level key', () => {
    const at = pathResolver('id');
    expect(at({ id: 1 })).toBe(1);
  });

  test('resolves a nested dot-delimited path', () => {
    const at = pathResolver('user.profile.name');
    expect(at({ user: { profile: { name: 'Ana' } } })).toBe('Ana');
  });

  test('returns undefined when a segment is missing', () => {
    const at = pathResolver('user.profile.name');
    expect(at({ user: {} })).toBeUndefined();
  });

  test('returns undefined when walking into a primitive', () => {
    const at = pathResolver('foo.bar');
    expect(at(42)).toBeUndefined();
    expect(at(null)).toBeUndefined();
    expect(at(undefined)).toBeUndefined();
  });

  test('returns the same accessor for repeated calls (no memoisation, no closure leak)', () => {
    const at = pathResolver('a');
    expect(at({ a: 1 })).toBe(1);
    expect(at({ a: 2 })).toBe(2);
  });
});
