import { pathResolver } from '../shared/pathResolver.js';

/**
 * Indexes a collection into a single-item lookup, keyed by the value at
 * `key` (dot-delimited for nested paths). For duplicate key values the
 * **last** item wins. Missing paths bucket under `'undefined'` (the
 * stringified result of `String(undefined)`).
 *
 * @example
 * keyBy([{ id: 'a' }, { id: 'b' }], 'id');
 * // { a: { id: 'a' }, b: { id: 'b' } }
 *
 * keyBy(users, 'profile.email');
 */
export function keyBy<T>(
  collection: readonly T[],
  key: string,
): Record<string, T> {
  const at = pathResolver(key);
  const result: Record<string, T> = {};

  for (const item of collection) {
    result[String(at(item))] = item;
  }
  return result;
}
