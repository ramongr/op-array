import {nestedObjectValue} from './nested-object';

/**
 * Wrapper for sorting within a collection
 * @param {string|number|boolean} first
 * @param {string|number|boolean} second
 * @param {string} key
 * @param {asc|desc} order
 * @return {number}
 */
export function collectionSort(first, second, key, order) {
  const firstValue = nestedObjectValue(first, key);
  const secondValue = nestedObjectValue(second, key);

  if (order === 'asc') {
    return ascendingSort(firstValue, secondValue);
  }

  return descendingSort(firstValue, secondValue);
};

/**
 * Sorts in ascending order
 * @param {string|number|boolean} first
 * @param {string|number|boolean} second
 * @return {number}
 */
export function ascendingSort(first, second) {
  if (first > second) {
    return 1;
  }

  if (first < second) {
    return -1;
  }

  return 0;
};

/**
 * Sorts in descending order
 * @param {string|number|boolean} first
 * @param {string|number|boolean} second
 * @return {number}
 */
export function descendingSort(first, second) {
  if (first < second) {
    return 1;
  }

  if (first > second) {
    return -1;
  }

  return 0;
};
