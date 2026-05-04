import { subtraction } from '../shared/arithmetic.js';

/**
 * Left-to-right subtraction across the array.
 *
 * @example
 * subtract([10, 3, 2]); // 5
 *
 * @throws {TypeError} when called with an empty array.
 */
export function subtract(values: readonly number[]): number {
  if (values.length === 0) {
    throw new TypeError('subtract: array must contain at least one number');
  }
  return values.reduce(subtraction);
}
