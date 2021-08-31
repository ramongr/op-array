"use strict";

require("./transformations");

require("./positional");

var _arithmetic = require("../shared/arithmetic");

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

if (!Array.prototype.min) {
  Array.prototype.min = function () {
    return Math.min.apply(Math, _toConsumableArray(this));
  };
}

if (!Array.prototype.max) {
  Array.prototype.max = function () {
    return Math.max.apply(Math, _toConsumableArray(this));
  };
}

if (!Array.prototype.sum) {
  Array.prototype.sum = function () {
    return this.reduce(_arithmetic.addition, 0);
  };
}

if (!Array.prototype.subtraction) {
  Array.prototype.subtraction = function () {
    return this.reduce(_arithmetic.subtraction);
  };
}

if (!Array.prototype.product) {
  Array.prototype.product = function () {
    return this.reduce(_arithmetic.multiplication);
  };
}

if (!Array.prototype.average) {
  Array.prototype.average = function () {
    return this.sum() / this.length;
  };
}

if (!Array.prototype.isEvenLength) {
  Array.prototype.isEvenLength = function () {
    return (0, _arithmetic.isEven)(this.length);
  };
}

if (!Array.prototype.median) {
  Array.prototype.median = function () {
    var sortedArray = this.sort();
    var half = (0, _arithmetic.halfPoint)(this.length);
    var median = sortedArray[half - 1];

    if (this.isEvenLength()) {
      return (median + sortedArray[half]) / 2;
    }

    return median;
  };
}

if (!Array.prototype.mode) {
  var firstIndices = function firstIndices(arr) {
    return arr.first;
  };

  var secondIndices = function secondIndices(arr) {
    return arr.second;
  };

  Array.prototype.mode = function () {
    var occurences = this.occurences();
    var maxOccurenceTime = occurences.map(secondIndices).max();

    var findValueByOccurrence = function findValueByOccurrence(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _ = _ref2[0],
          times = _ref2[1];

      return times === maxOccurenceTime;
    };

    return occurences.filter(findValueByOccurrence).map(firstIndices);
  };
}