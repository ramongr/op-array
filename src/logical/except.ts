/**
 * Returns the elements of `source` that are not present in `excluded`.
 * Runs in O(n + m).
 */
export function except<T>(source: readonly T[], excluded: readonly T[]): T[] {
  const excludedSet = new Set(excluded);
  return source.filter((item) => !excludedSet.has(item));
}
