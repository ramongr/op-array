import { nestedObjectValue } from './nestedObject.js';

/**
 * Builds an accessor that returns the value at a dot-delimited `path`
 * for any item, delegating to {@link nestedObjectValue}.
 *
 * Centralises dot-path access so every key-taking function in the
 * library resolves keys identically. Internal helper — not part of the
 * public API.
 *
 * @example
 * const at = pathResolver('user.name');
 * at({ user: { name: 'Ana' } }); // 'Ana'
 * at({ user: {} });              // undefined
 */
export function pathResolver(path: string): (item: unknown) => unknown {
  return (item) => nestedObjectValue(item, path);
}
