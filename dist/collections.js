"use strict";

var _nestedObject = require("../shared/nested-object");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Finds within a collection for a key with a given value
 * @param {string} key
 * @param {any} value
 * @return {(undefined|Array)}
 */
Array.prototype.findBy = function (key, value) {
  return this.find(function (item) {
    return (0, _nestedObject.nestedObjectValue)(item, key) === value;
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
    return (0, _nestedObject.nestedObjectValue)(item, key) === value;
  });
};
/**
 * Filters every item in a collection with a given set of keys
 * @param {Array} keys
 * @return {Array}
 */


Array.prototype.extract = function (keys) {
  var keyFromArray = function keyFromArray(arr, item) {
    return [].concat(_toConsumableArray(arr), [(0, _nestedObject.objectFromKeys)(item, keys)]);
  };

  return this.reduce(keyFromArray, []);
};