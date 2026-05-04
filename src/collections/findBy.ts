import { nestedObjectValue } from '../shared/nestedObject.js';

/**
 * Finds the first item in a collection where the value at `key`
 * (dot-delimited for nested paths) equals `value`.
 *
 * @example
 * findBy([{ id: 1 }, { id: 2 }], 'id', 2); // { id: 2 }
 * findBy([{ user: { name: 'Ana' } }], 'user.name', 'Ana');
 */
export function findBy<T>(
  collection: readonly T[],
  key: string,
  value: unknown,
): T | undefined {
  return collection.find((item) => nestedObjectValue(item, key) === value);
}
