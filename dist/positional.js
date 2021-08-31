"use strict";

Object.defineProperty(Array.prototype, 'first', {
  get: function get() {
    return this[0];
  }
});
Object.defineProperty(Array.prototype, 'second', {
  get: function get() {
    return this[1];
  }
});
Object.defineProperty(Array.prototype, 'third', {
  get: function get() {
    return this[2];
  }
});
Object.defineProperty(Array.prototype, 'last', {
  get: function get() {
    return this[this.length - 1];
  }
});