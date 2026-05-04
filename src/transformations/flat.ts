/**
 * Flattens nested arrays. Behaves like the native `Array.prototype.flat`
 * but accepts a `readonly` input.
 *
 * @param depth How many levels to flatten. Default `1`.
 *
 * @example
 * flat([[1, 2], [3, [4]]]);    // [1, 2, 3, [4]]
 * flat([[1, [2, [3]]]], 2);    // [1, 2, [3]]
 */
export function flat<T>(values: readonly T[], depth: number = 1): unknown[] {
  return (values as T[]).flat(depth);
}
