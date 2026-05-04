/** Largest value in the array. Returns `-Infinity` for empty arrays. */
export function max(values: readonly number[]): number {
  return Math.max(...values);
}
