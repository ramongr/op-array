/** Returns the array with duplicates removed (preserves first occurrence). */
export function unique<T>(values: readonly T[]): T[] {
  return Array.from(new Set(values));
}
