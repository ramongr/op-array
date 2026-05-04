import { nestedObjectValue } from '../shared/nestedObject.js';

/**
 * Returns every item in the collection where the value at `key`
 * (dot-delimited for nested paths) equals `value`.
 *
 * @example
 * where([{ role: 'a' }, { role: 'b' }, { role: 'a' }], 'role', 'a');
 * // [{ role: 'a' }, { role: 'a' }]
 */
export function where<T>(
  collection: readonly T[],
  key: string,
  value: unknown,
): T[] {
  return collection.filter((item) => nestedObjectValue(item, key) === value);
}
