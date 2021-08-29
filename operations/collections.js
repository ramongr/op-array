import {nestedObjectKey} from '../shared/nested-object';

/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {(undefined|Array)}
 */
Array.prototype.findBy = function(key, value) {
  return this.find((item) => nestedObjectKey(item, key) === value);
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
  return this.filter((item) => nestedObjectKey(item, key) === value);
};

