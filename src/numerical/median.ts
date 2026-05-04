/**
 * Median value. Sorts numerically without mutating the input.
 *
 * For even-length arrays returns the mean of the two middle values.
 *
 * @throws {TypeError} when called with an empty array.
 */
export function median(values: readonly number[]): number {
  if (values.length === 0) {
    throw new TypeError('median: array must contain at least one number');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2;
  }
  return sorted[mid] as number;
}
