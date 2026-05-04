import { isEven } from '../shared/arithmetic.js';

/** Reports whether the array's length is an even number. */
export function hasEvenLength<T>(values: readonly T[]): boolean {
  return isEven(values.length);
}
