/**
 * Counts how many times each value appears.
 *
 * @returns An array of `[value, count]` pairs in insertion order.
 *
 * @example
 * occurrences([1, 2, 2, 3]); // [[1, 1], [2, 2], [3, 1]]
 */
export function occurrences<T>(values: readonly T[]): [T, number][] {
  const counts = new Map<T, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts);
}
