/** Returns the array with duplicates removed (preserves first occurrence). */
export function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}
