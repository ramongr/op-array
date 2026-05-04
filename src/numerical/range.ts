/**
 * Range (a.k.a. extent / spread): the difference between the largest
 * and smallest value. Computed in a single pass.
 *
 * - Single-element input returns `0`.
 *
 * @throws {TypeError} when called with an empty array.
 *
 * @example
 * range([1, 5, 3, 9, 2]); // 8
 * range([42]);            // 0
 */
export function range(values: readonly number[]): number {
  if (values.length === 0) {
    throw new TypeError('range: array must contain at least one number');
  }
  let lo = values[0] as number;
  let hi = lo;
  for (let i = 1; i < values.length; i++) {
    const v = values[i] as number;
    if (v < lo) lo = v;
    else if (v > hi) hi = v;
  }
  return hi - lo;
}
