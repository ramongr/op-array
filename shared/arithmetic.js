/**
 * Adds two numbers
 * @param {number} left The leftmost number
 * @param {number} right The rightmost number
 * @return {number} The sum of both numbers
*/
export function addition(left, right) {
  return left + right;
}

/**
 * Returns the midpoint index of any array (rounded for odd sized arrays)
 * @param {number} num The array length
 * @return {number} The rounded midpoint array position
*/
export function halfPoint(num) {
  return Math.round(num / 2);
}

/**
 * Checks if a number is even
 * @param {number} num The number
 * @return {boolean} Is the number even?
*/
export function isEven(num) {
  return (num % 2 === 0);
}

/**
 * Checks if a number is odd
 * @param {number} num The number
 * @return {boolean} Is the number odd?
*/
export function isOdd(num) {
  return !isEven(num);
}

/**
 * Multiplies two numbers
 * @param {number} left The leftmost number
 * @param {number} right The rightmost number
 * @return {number} The product of both numbers
*/
export function multiplication(left, right) {
  return left * right;
}

/**
 * Subtracts two numbers
 * @param {number} left The leftmost number
 * @param {number} right The rightmost number
 * @return {number} The subtraction of both numbers
*/
export function subtraction(left, right) {
  return left - right;
}

