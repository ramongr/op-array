/**
 * Quantile of the values using linear interpolation between adjacent
 * ordered values (the "R-7" / Excel / NumPy-default method, which
 * generalises {@link median} so that `quantile(values, 0.5)` agrees
 * with `median(values)` for odd-length input and matches the
 * even-length midpoint average).
 *
 * - `q = 0` returns the minimum, `q = 1` the maximum.
 * - Sorts numerically without mutating the input.
 * - Propagates `NaN`: any `NaN` in the input makes the result `NaN`,
 *   matching `range` / `variance` / `standardDeviation`.
 *
 * @throws {TypeError} on empty input.
 * @throws {RangeError} when `q` is outside `[0, 1]` or is `NaN`.
 *
 * @example
 * quantile([1, 2, 3, 4], 0.5);  // 2.5
 * quantile([1, 2, 3, 4], 0.25); // 1.75
 * quantile([1, 2, 3, 4], 0);    // 1
 * quantile([1, 2, 3, 4], 1);    // 4
 */
export function quantile(values: readonly number[], q: number): number {
  if (values.length === 0) {
    throw new TypeError('quantile: array must contain at least one number');
  }
  if (!(q >= 0 && q <= 1)) {
    throw new RangeError('quantile: q must be in the range [0, 1]');
  }

  for (const v of values) {
    if (Number.isNaN(v)) return Number.NaN;
  }

  const sorted = values.toSorted((a, b) => a - b);
  const h = (sorted.length - 1) * q;
  const i = Math.floor(h);
  const lower = sorted[i] as number;

  if (i + 1 >= sorted.length) return lower;

  const upper = sorted[i + 1] as number;
  return lower + (h - i) * (upper - lower);
}
