import { pathResolver } from '../shared/pathResolver.js';

/**
 * Removes duplicates by the value at `key` (dot-delimited for nested
 * paths). The first occurrence per resolved key wins, preserving order.
 * Items where the path is missing all collapse to a single bucket
 * keyed under `undefined`.
 *
 * @example
 * uniqueBy(users, 'id');
 * uniqueBy(orders, 'customer.email');
 */
export function uniqueBy<T>(values: readonly T[], key: string): T[] {
  const at = pathResolver(key);
  const seen = new Set<unknown>();
  const result: T[] = [];

  for (const item of values) {
    const k = at(item);
    if (!seen.has(k)) {
      seen.add(k);
      result.push(item);
    }
  }
  return result;
}
