import { variance } from './variance.js';

/**
 * Standard deviation: square root of `variance(values, mode)`.
 *
 * - `mode = 'population'` (default) → σ.
 * - `mode = 'sample'` → s (Bessel's correction).
 * - Propagates `NaN` (inherited from `variance`).
 *
 * @throws {TypeError} on empty input, or on single-element input when
 *   `mode === 'sample'`.
 *
 * @example
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);           // 2
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], 'sample'); // ≈ 2.1380…
 */
export function standardDeviation(
  values: readonly number[],
  mode: 'population' | 'sample' = 'population',
): number {
  return Math.sqrt(variance(values, mode));
}
