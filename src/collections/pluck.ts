import { pathResolver } from '../shared/pathResolver.js';

/**
 * Projects every item in the collection down to the value at `key`
 * (dot-delimited for nested paths).
 *
 * Sits alongside `extract` (which keeps multiple keys per object);
 * `pluck` returns a flat array of single values. A missing path
 * resolves to `undefined` for that slot, matching `findBy` semantics.
 *
 * @example
 * pluck([{ id: 1 }, { id: 2 }], 'id'); // [1, 2]
 * pluck(
 *   [{ user: { name: 'Ana' } }, { user: { name: 'Bo' } }],
 *   'user.name',
 * ); // ['Ana', 'Bo']
 */
export function pluck<T>(collection: readonly T[], key: string): unknown[] {
  return collection.map(pathResolver(key));
}
