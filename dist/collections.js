"use strict";

var _nestedObject = require("../shared/nested-object");

/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {(undefined|Array)}
 */
Array.prototype.findBy = function (key, value) {
  return this.find(function (item) {
    return (0, _nestedObject.nestedObjectKey)(item, key) === value;
  });
};
/**
 * Finds within a collection for an id with a given value
 * @param {any} value
 * @return {(undefined|Array)}
 */


Array.prototype.findById = function (value) {
  return this.find(function (_ref) {
    var id = _ref.id;
    return id === value;
  });
};
/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {Array}
 */


Array.prototype.where = function (key, value) {
  return this.filter(function (item) {
    return (0, _nestedObject.nestedObjectKey)(item, key) === value;
  });
};