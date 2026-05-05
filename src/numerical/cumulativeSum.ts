/**
 * Running totals: returns an array of the same length where each
 * element is the sum of all input values up to and including that
 * index.
 *
 * - Empty input returns `[]` (additive identity, matches `sum`).
 * - Output length always equals input length.
 * - Does not mutate the input.
 * - Any `NaN` in the input poisons that position and every subsequent
 *   position (a direct consequence of accumulating with `+`).
 *
 * @example
 * cumulativeSum([1, 2, 3, 4]); // [1, 3, 6, 10]
 * cumulativeSum([]);           // []
 */
export function cumulativeSum(values: readonly number[]): number[] {
  const result: number[] = [];
  let running = 0;
  for (let i = 0; i < values.length; i++) {
    running += values[i] as number;
    result.push(running);
  }
  return result;
}
