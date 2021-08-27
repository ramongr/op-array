"use strict";

var _arithmetic = require("../shared/arithmetic");

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
  var firstIndices = function firstIndices(accumulator, arr) {
    return [].concat(_toConsumableArray(accumulator), [arr.first]);
  };

  var secondIndices = function secondIndices(accumulator, arr) {
    return [].concat(_toConsumableArray(accumulator), [arr.second]);
  };

  Array.prototype.mode = function () {
    var occurences = this.occurences();
    var occurenceTimes = occurences.reduce(secondIndices);
    var occurenceValues = occurences.reduce(firstIndices);
    return occurenceValues.filter(function (value) {
      return value === occurenceTimes.max();
    });
  };
}