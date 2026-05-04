import { pathResolver } from '../shared/pathResolver.js';

/**
 * Groups items by the value at `key` (dot-delimited for nested paths).
 * Group order matches the order in which each bucket's first item was
 * encountered. Missing paths bucket under the string `'undefined'`.
 *
 * Mirrors `Object.groupBy` semantics but takes a string dot-path
 * instead of a callback, matching the rest of the op-array API.
 *
 * @example
 * groupBy(orders, 'status');
 * // { paid: [...], refunded: [...] }
 *
 * groupBy(users, 'address.country');
 */
export function groupBy<T>(
  collection: readonly T[],
  key: string,
): Record<string, T[]> {
  const at = pathResolver(key);
  const result: Record<string, T[]> = {};

  for (const item of collection) {
    const bucket = String(at(item));
    (result[bucket] ??= []).push(item);
  }
  return result;
}
