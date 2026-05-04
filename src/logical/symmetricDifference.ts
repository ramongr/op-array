/**
 * Returns the symmetric difference (xor) of two arrays: items present
 * in exactly one of `left` or `right`. Order is left-first, then
 * right; duplicates are collapsed via `Set` (SameValueZero).
 *
 * Runs in O(n + m).
 *
 * @example
 * symmetricDifference([1, 2, 3], [2, 3, 4]); // [1, 4]
 * symmetricDifference([1, 1, 2], [2, 3]);    // [1, 3]
 * symmetricDifference([1, 2], [2, 1]);       // []
 * symmetricDifference([], []);               // []
 */
export function symmetricDifference<T>(
  left: readonly T[],
  right: readonly T[],
): T[] {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const result: T[] = [];

  for (const item of leftSet) {
    if (!rightSet.has(item)) {
      result.push(item);
    }
  }
  for (const item of rightSet) {
    if (!leftSet.has(item)) {
      result.push(item);
    }
  }
  return result;
}
