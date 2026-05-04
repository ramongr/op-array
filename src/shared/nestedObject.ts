/**
 * Walks a dot-delimited path through a nested object and returns the value at
 * that path, or `undefined` if any segment is missing.
 *
 * @example
 * nestedObjectValue({ a: { b: { c: 1 } } }, 'a.b.c'); // 1
 * nestedObjectValue({ a: 1 }, 'a.b.c');               // undefined
 */
export function nestedObjectValue(obj: unknown, path: string): unknown {
  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

/**
 * Builds a new object containing only the listed keys from the source object.
 *
 * @example
 * objectFromKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
 */
export function objectFromKeys<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = source[key];
  }
  return result;
}
