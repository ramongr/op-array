/**
 * Returns `true` when every distinct element of `left` is present in
 * `right`. Element comparison uses `Set` (SameValueZero) semantics.
 *
 * Empty `left` is vacuously a subset of any array (including `[]`).
 *
 * Runs in O(n + m).
 *
 * @example
 * isSubset([1, 2], [1, 2, 3]); // true
 * isSubset([1, 4], [1, 2, 3]); // false
 * isSubset([], [1, 2]);        // true
 * isSubset([1], []);           // false
 */
export function isSubset<T>(left: readonly T[], right: readonly T[]): boolean {
  if (left.length === 0) return true;
  const rightSet = new Set(right);
  for (const item of left) {
    if (!rightSet.has(item)) return false;
  }
  return true;
}
