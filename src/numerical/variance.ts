/**
 * Variance of the values. Two-pass: computes the mean, then the average
 * of the squared deviations from the mean.
 *
 * - `mode = 'population'` (default) divides by `n` (σ²).
 * - `mode = 'sample'` divides by `n - 1` (s², Bessel's correction).
 *
 * @throws {TypeError} on empty input, or on single-element input when
 *   `mode === 'sample'` (division by zero).
 *
 * @example
 * variance([2, 4, 4, 4, 5, 5, 7, 9]);           // 4
 * variance([2, 4, 4, 4, 5, 5, 7, 9], 'sample'); // 4.571428571428571
 */
export function variance(
  values: readonly number[],
  mode: 'population' | 'sample' = 'population',
): number {
  if (values.length === 0) {
    throw new TypeError('variance: array must contain at least one number');
  }
  if (mode === 'sample' && values.length < 2) {
    throw new TypeError('variance: sample variance requires at least two numbers');
  }

  let total = 0;
  for (const v of values) total += v;
  const mean = total / values.length;

  let sumSquaredDeviations = 0;
  for (const v of values) {
    const d = v - mean;
    sumSquaredDeviations += d * d;
  }

  const divisor = mode === 'sample' ? values.length - 1 : values.length;
  return sumSquaredDeviations / divisor;
}
