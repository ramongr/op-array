"use strict";

var _emptyValues = require("../shared/empty-values");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (!Array.prototype.unique) {
  Array.prototype.unique = function () {
    return Array.from(new Set(this));
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function () {
    return this.reduce(function (flatArray, array) {
      return [].concat(_toConsumableArray(flatArray), _toConsumableArray(array));
    });
  };
}

if (!Array.prototype.intervals) {
  Array.prototype.intervals = function (amount) {
    var offset = Math.ceil(this.length / amount);
    return this.reduce(function (offsets, _, index) {
      if (index === 0 || index % offset === 0) {
        offsets.push([index, index + offset]);
      }

      return offsets;
    }, []);
  };
}

if (!Array.prototype.inGroups) {
  Array.prototype.inGroups = function (amount) {
    var _this = this;

    return this.intervals(amount).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          firstIndex = _ref2[0],
          lastIndex = _ref2[1];

      return _this.slice(firstIndex, lastIndex);
    });
  };
}

if (!Array.prototype.occurrences) {
  Array.prototype.occurrences = function () {
    var occurrences = new Map();
    this.forEach(function (item) {
      var itemValue = occurrences.get(item);

      if (itemValue === undefined) {
        occurrences.set(item, 1);
      } else {
        occurrences.set(item, itemValue + 1);
      }
    });
    return Array.from(occurrences);
  };
}

if (!Array.prototype.compact) {
  Array.prototype.compact = function () {
    return this.filter(_emptyValues.hasValue);
  };
}