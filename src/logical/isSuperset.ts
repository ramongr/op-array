/**
 * Returns `true` when every element of `right` is present in `left`,
 * i.e. `left` is a (non-strict) superset of `right`. Element comparison
 * uses `Set` (SameValueZero) semantics, so duplicates in `right`
 * collapse to a single membership check.
 *
 * Empty `right` is vacuously a subset of any array, so any `left`
 * (including `[]`) is a superset of `[]`.
 *
 * Runs in O(n + m).
 *
 * @example
 * isSuperset([1, 2, 3], [1, 2]); // true
 * isSuperset([1, 2, 3], [1, 4]); // false
 * isSuperset([1, 2], []);        // true
 * isSuperset([], [1]);           // false
 */
export function isSuperset<T>(left: readonly T[], right: readonly T[]): boolean {
  if (right.length === 0) return true;
  const leftSet = new Set(left);
  for (const item of right) {
    if (!leftSet.has(item)) return false;
  }
  return true;
}
