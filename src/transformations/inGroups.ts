/**
 * Splits the array into exactly `groupCount` contiguous groups. The final
 * group may be smaller if the length is not evenly divisible.
 *
 * @example
 * inGroups([1, 2, 3, 4, 5], 2); // [[1, 2, 3], [4, 5]]
 * inGroups([1, 2, 3], 5);       // [[1], [2], [3], [], []]
 */
export function inGroups<T>(values: readonly T[], groupCount: number): T[][] {
  if (groupCount <= 0 || !Number.isFinite(groupCount)) {
    throw new RangeError('inGroups: groupCount must be a positive integer');
  }
  const size = Math.ceil(values.length / groupCount);
  const groups: T[][] = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push(values.slice(i * size, (i + 1) * size));
  }
  return groups;
}

/**
 * Splits the array into groups of `size` consecutive elements. The final
 * group may be smaller.
 *
 * @example
 * inGroupsOf([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function inGroupsOf<T>(values: readonly T[], size: number): T[][] {
  if (size <= 0 || !Number.isFinite(size)) {
    throw new RangeError('inGroupsOf: size must be a positive integer');
  }
  const groups: T[][] = [];
  for (let i = 0; i < values.length; i += size) {
    groups.push(values.slice(i, i + size));
  }
  return groups;
}
