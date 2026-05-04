/**
 * Returns every value tied for the highest occurrence count.
 * Order matches first appearance in the input. Returns `[]` for empty input.
 *
 * @example
 * mode([1, 2, 2, 3]);      // [2]
 * mode([1, 1, 2, 2, 3]);   // [1, 2]
 */
export function mode<T>(values: readonly T[]): T[] {
  if (values.length === 0) {
    return [];
  }

  const counts = new Map<T, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  let highest = 0;
  for (const count of counts.values()) {
    if (count > highest) {
      highest = count;
    }
  }

  const result: T[] = [];
  for (const [value, count] of counts) {
    if (count === highest) {
      result.push(value);
    }
  }
  return result;
}
