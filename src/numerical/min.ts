/** Smallest value in the array. Returns `Infinity` for empty arrays. */
export function min(values: readonly number[]): number {
  return Math.min(...values);
}
