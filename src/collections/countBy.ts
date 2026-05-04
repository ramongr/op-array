import { pathResolver } from '../shared/pathResolver.js';

/**
 * Counts items per bucket, where each bucket is the value at `key`
 * (dot-delimited for nested paths). Complements `occurrences` (which
 * counts whole values) by counting per dot-path key. Missing paths
 * count under the string `'undefined'`.
 *
 * @example
 * countBy(orders, 'status');
 * // { paid: 3, refunded: 1 }
 *
 * countBy(users, 'address.country');
 */
export function countBy<T>(
  collection: readonly T[],
  key: string,
): Record<string, number> {
  const at = pathResolver(key);
  const result: Record<string, number> = {};

  for (const item of collection) {
    const bucket = String(at(item));
    result[bucket] = (result[bucket] ?? 0) + 1;
  }
  return result;
}
