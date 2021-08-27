"use strict";

if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, 'last', {
    get: function get() {
      return this[this.length - 1];
    }
  });
}

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
    var unionizableArray = this.except(arr);
    return this.concat(unionizableArray);
  };
}