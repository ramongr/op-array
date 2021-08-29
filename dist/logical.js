"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (!Array.prototype.intersection) {
  Array.prototype.intersection = function (arr) {
    return this.filter(function (item) {
      return arr.indexOf(item) !== -1;
    });
  };
}

if (!Array.prototype.exists) {
  Array.prototype.exists = function () {
    var itemOrArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (this.length === 0) {
      return false;
    }

    var arr = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    return this.intersection(arr).length > 0;
  };
}

if (!Array.prototype.except) {
  Array.prototype.except = function (itemOrArray) {
    var arr = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    return this.filter(function (item) {
      return arr.indexOf(item) === -1;
    });
  };
}

if (!Array.prototype.union) {
  Array.prototype.union = function (arr) {
    var unionizableArray = arr.except(this);
    return [].concat(_toConsumableArray(this), _toConsumableArray(unionizableArray));
  };
}