"use strict";

if (!Array.prototype.first) {
  Object.defineProperty(Array.prototype, 'first', {
    get: function get() {
      return this[0];
    }
  });
}

if (!Array.prototype.second) {
  Object.defineProperty(Array.prototype, 'second', {
    get: function get() {
      return this[1];
    }
  });
}

if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, 'last', {
    get: function get() {
      return this[this.length - 1];
    }
  });
}