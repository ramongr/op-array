/**
 * Returns the union of two arrays without duplicates. Order is the order of
 * first appearance across `left` then `right`.
 */
export function union<T>(left: readonly T[], right: readonly T[]): T[] {
  return [...new Set([...left, ...right])];
}
