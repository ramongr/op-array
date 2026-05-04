/**
 * Splits a collection into two arrays in a single pass: items where
 * `predicate` returns `true` go into `pass`, the rest into `fail`.
 *
 * The predicate result is required to be a boolean — truthy/falsy
 * values are not coerced.
 *
 * @example
 * partition([1, 2, 3, 4], (n) => n % 2 === 0);
 * // { pass: [2, 4], fail: [1, 3] }
 *
 * partition<number>([], (n) => n > 0);
 * // { pass: [], fail: [] }
 */
export function partition<T>(
  collection: readonly T[],
  predicate: (item: T, index: number) => boolean,
): { pass: T[]; fail: T[] } {
  const pass: T[] = [];
  const fail: T[] = [];

  collection.forEach((item, index) => {
    if (predicate(item, index)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  });

  return { pass, fail };
}
