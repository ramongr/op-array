import { sum } from './sum.js';

/**
 * Arithmetic mean of the array.
 *
 * @returns `NaN` for empty arrays (mirrors `0 / 0`).
 */
export function average(values: readonly number[]): number {
  return sum(values) / values.length;
}
