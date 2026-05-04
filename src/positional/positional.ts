/** First element, or `undefined` if the array is empty. */
export function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

/** Second element, or `undefined` if absent. */
export function second<T>(values: readonly T[]): T | undefined {
  return values[1];
}

/** Third element, or `undefined` if absent. */
export function third<T>(values: readonly T[]): T | undefined {
  return values[2];
}

/** Last element, or `undefined` if the array is empty. */
export function last<T>(values: readonly T[]): T | undefined {
  return values.at(-1);
}
