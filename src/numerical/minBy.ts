import { pathResolver } from '../shared/pathResolver.js';

/**
 * Returns the item with the smallest numeric value at `key`
 * (dot-delimited for nested paths), or `undefined` when no item has a
 * comparable numeric value.
 *
 * - Empty input → `undefined`.
 * - Items where the resolved value is missing (`undefined` / `null`),
 *   `NaN`, or not a number are excluded from comparison.
 * - Ties: first occurrence wins.
 * - Returns the source item, not the resolved numeric value.
 *
 * @example
 * minBy(products, 'price');
 * minBy(users, 'profile.age');
 */
export function minBy<T>(collection: readonly T[], key: string): T | undefined {
  const at = pathResolver(key);
  let best: T | undefined;
  let bestValue = Number.POSITIVE_INFINITY;

  for (const item of collection) {
    const v = at(item);
    if (typeof v !== 'number' || Number.isNaN(v)) continue;
    if (v < bestValue) {
      bestValue = v;
      best = item;
    }
  }
  return best;
}
