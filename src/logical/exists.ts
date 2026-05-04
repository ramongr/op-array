/**
 * Reports whether `item` exists in `source`.
 *
 * @example
 * exists([1, 2, 3], 2); // true
 * exists([], 2);        // false
 */
export function exists<T>(source: readonly T[], item: T): boolean {
  return source.includes(item);
}

/**
 * Reports whether **every** item in `items` exists in `source`.
 * Returns `true` for an empty `items` list (vacuously true) only when
 * `source` is non-empty; returns `false` if `source` is empty.
 *
 * @example
 * existsAll([1, 2, 3], [1, 3]); // true
 * existsAll([1, 2, 3], [1, 9]); // false
 */
export function existsAll<T>(
  source: readonly T[],
  items: readonly T[],
): boolean {
  if (source.length === 0) {
    return false;
  }
  const sourceSet = new Set(source);
  return items.every((item) => sourceSet.has(item));
}
