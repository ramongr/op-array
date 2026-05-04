import { objectFromKeys } from '../shared/nestedObject.js';

/**
 * Projects every item in the collection down to the listed keys.
 *
 * @example
 * extract([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a']);
 * // [{ a: 1 }, { a: 3 }]
 */
export function extract<T extends object, K extends keyof T>(
  collection: readonly T[],
  keys: readonly K[],
): Pick<T, K>[] {
  return collection.map((item) => objectFromKeys(item, keys));
}
