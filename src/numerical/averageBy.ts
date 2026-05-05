import { pathResolver } from '../shared/pathResolver.js';

/**
 * Arithmetic mean of the numeric values at `key` (dot-delimited for
 * nested paths) across every item in `collection`.
 *
 * - Empty input → `NaN` (matches `average`, consistent with `0 / 0`).
 * - Strict: any item where the resolved value is missing or not a
 *   `number` throws `TypeError`. Use `pluck(...).filter(...)` upstream
 *   if you need to skip items.
 * - `NaN` propagates: a `NaN` value yields `NaN`.
 *
 * @throws {TypeError} when an item resolves to a missing or non-numeric
 *   value at `key`.
 *
 * @example
 * averageBy([{ grade: 80 }, { grade: 90 }], 'grade'); // 85
 * averageBy(users, 'profile.age');
 */
export function averageBy<T>(collection: readonly T[], key: string): number {
  if (collection.length === 0) return Number.NaN;

  const at = pathResolver(key);
  let total = 0;

  for (let i = 0; i < collection.length; i++) {
    const v = at(collection[i]);
    if (typeof v !== 'number') {
      const kind =
        v === null ? 'null' : v === undefined ? 'missing' : typeof v;
      throw new TypeError(
        `averageBy: value at "${key}" on item ${i} is not a number (${kind})`,
      );
    }
    total += v;
  }
  return total / collection.length;
}
