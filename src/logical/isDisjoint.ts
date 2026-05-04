/**
 * Returns `true` when `left` and `right` share no elements. Element
 * comparison uses `Set` (SameValueZero) semantics.
 *
 * Either side empty → `true` (vacuously disjoint).
 *
 * Runs in O(n + m).
 *
 * @example
 * isDisjoint([1, 2], [3, 4]); // true
 * isDisjoint([1, 2], [2, 3]); // false
 * isDisjoint([], [1, 2]);     // true
 * isDisjoint([1, 2], []);     // true
 */
export function isDisjoint<T>(left: readonly T[], right: readonly T[]): boolean {
  if (left.length === 0 || right.length === 0) return true;
  const [smaller, larger] = left.length <= right.length ? [left, right] : [right, left];
  const lookup = new Set(larger);
  for (const item of smaller) {
    if (lookup.has(item)) return false;
  }
  return true;
}
