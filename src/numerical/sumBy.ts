import { pathResolver } from '../shared/pathResolver.js';

/**
 * Sum of the numeric values at `key` (dot-delimited for nested paths)
 * across every item in `collection`.
 *
 * - Empty input → `0` (additive identity, matches `sum`).
 * - Strict: any item where the resolved value is missing or not a
 *   `number` throws `TypeError`. Use `pluck(...).filter(...)` upstream
 *   if you need to skip items.
 * - `NaN` propagates: a `NaN` value yields `NaN` (matches `+`).
 *
 * @throws {TypeError} when an item resolves to a missing or non-numeric
 *   value at `key`.
 *
 * @example
 * sumBy([{ total: 10 }, { total: 5 }], 'total'); // 15
 * sumBy(orders, 'shipping.fee');
 */
export function sumBy<T>(collection: readonly T[], key: string): number {
  const at = pathResolver(key);
  let total = 0;

  for (const item of collection) {
    const v = at(item);
    if (typeof v !== 'number') {
      throw new TypeError(
        `sumBy: value at "${key}" is not a number (got ${v === undefined ? 'undefined' : typeof v})`,
      );
    }
    total += v;
  }
  return total;
}
