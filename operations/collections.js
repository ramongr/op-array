import {nestedObjectValue, objectFromKeys} from '../shared/nested-object';
import {collectionSort} from '../shared/sorting';

/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {(undefined|Array)}
 */
Array.prototype.findBy = function(key, value) {
  return this.find((item) => nestedObjectValue(item, key) === value);
};

/**
 * Finds within a collection for an id with a given value
 * @param {any} value
 * @return {(undefined|Array)}
 */
Array.prototype.findById = function(value) {
  return this.find(({id}) => id === value);
};

/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {Array}
 */
Array.prototype.where = function(key, value) {
  return this.filter((item) => nestedObjectValue(item, key) === value);
};

/**
 * Filters every item in a collection with a given set of keys
 * @param {Array} keys
 * @return {Array}
 */
Array.prototype.extract = function(keys) {
  const keyFromArray = (arr, item) => [...arr, objectFromKeys(item, keys)];

  return this.reduce(keyFromArray, []);
};

/**
 * Sorts a collection by a given key and order
 * @param {string} key
 * @param {asc|desc} order
 * @return {Array}
 */
Array.prototype.sortBy = function(key, order) {
  return this.sort((first, second) => {
    return collectionSort(first, second, key, order);
  });
};
