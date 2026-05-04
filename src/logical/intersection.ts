/**
 * Returns the elements present in both arrays. Order follows the first array;
 * duplicates from the first array are preserved.
 *
 * Runs in O(n + m) using a Set lookup.
 */
export function intersection<T>(left: readonly T[], right: readonly T[]): T[] {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item));
}
