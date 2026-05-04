/**
 * Finds the first item whose `id` property equals the provided value.
 *
 * @example
 * findById([{ id: 1 }, { id: 2 }], 2); // { id: 2 }
 */
export function findById<T extends { id: unknown }>(
  collection: readonly T[],
  value: T['id'],
): T | undefined {
  return collection.find((item) => item.id === value);
}
