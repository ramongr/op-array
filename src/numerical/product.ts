import { multiplication } from '../shared/arithmetic.js';

/**
 * Product of all values.
 *
 * @throws {TypeError} when called with an empty array.
 */
export function product(values: readonly number[]): number {
  if (values.length === 0) {
    throw new TypeError('product: array must contain at least one number');
  }
  return values.reduce(multiplication);
}
