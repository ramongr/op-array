/**
 * Adds two numbers.
 */
export function addition(left: number, right: number): number {
  return left + right;
}

/**
 * Subtracts two numbers.
 */
export function subtraction(left: number, right: number): number {
  return left - right;
}

/**
 * Multiplies two numbers.
 */
export function multiplication(left: number, right: number): number {
  return left * right;
}

/**
 * Returns the midpoint index of an array length (rounded up for odd sizes).
 */
export function halfPoint(length: number): number {
  return Math.round(length / 2);
}

/**
 * Checks if a number is even.
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * Checks if a number is odd.
 */
export function isOdd(num: number): boolean {
  return !isEven(num);
}
