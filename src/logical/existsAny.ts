/**
 * Reports whether **any** item in `items` exists in `source`. The
 * disjunctive sibling of {@link existsAll}.
 *
 * Returns `false` for an empty `items` list (nothing to find) and
 * `false` for an empty `source` regardless of `items`.
 *
 * @example
 * existsAny([1, 2, 3], [4, 2]); // true
 * existsAny([1, 2, 3], [4, 5]); // false
 * existsAny([], [1]);           // false
 * existsAny([1], []);           // false
 */
export function existsAny<T>(
  source: readonly T[],
  items: readonly T[],
): boolean {
  if (source.length === 0 || items.length === 0) {
    return false;
  }
  const sourceSet = new Set(source);
  return items.some((item) => sourceSet.has(item));
}
