/**
 * Set-equality check: returns `true` when both arrays contain exactly
 * the same distinct elements, regardless of order or duplicates.
 *
 * This is **not** a deep equality check. Element comparison uses the
 * same identity semantics as `Set` (SameValueZero).
 *
 * @example
 * equals([1, 2, 3], [3, 2, 1]); // true
 * equals([1, 2], [1, 2, 2]);    // true  (set semantics)
 * equals([1, 2], [1, 3]);       // false
 * equals([], []);               // true
 */
export function equals<T>(left: readonly T[], right: readonly T[]): boolean {
  const leftSet = new Set(left);
  const rightSet = new Set(right);

  if (leftSet.size !== rightSet.size) {
    return false;
  }
  for (const item of leftSet) {
    if (!rightSet.has(item)) {
      return false;
    }
  }
  return true;
}
