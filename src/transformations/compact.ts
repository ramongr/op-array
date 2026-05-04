/**
 * Removes all falsy values: `false`, `0`, `0n`, `''`, `null`, `undefined`,
 * and `NaN`. Mirrors `lodash.compact`.
 *
 * @example
 * compact([0, 1, false, 2, '', 3, null, NaN]); // [1, 2, 3]
 */
export function compact<T>(values: readonly T[]): NonNullable<T>[] {
  return values.filter(Boolean) as NonNullable<T>[];
}

/**
 * Removes only `null` and `undefined` values.
 *
 * @example
 * compactNullish([0, 1, null, '', undefined]); // [0, 1, '']
 */
export function compactNullish<T>(values: readonly T[]): NonNullable<T>[] {
  return values.filter(
    (value): value is NonNullable<T> => value !== null && value !== undefined,
  );
}
