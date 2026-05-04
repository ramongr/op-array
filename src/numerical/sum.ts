import { addition } from '../shared/arithmetic.js';

/** Sum of all values. Returns `0` for empty arrays. */
export function sum(values: readonly number[]): number {
  return values.reduce(addition, 0);
}
