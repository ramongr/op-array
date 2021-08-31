Object.defineProperty(Array.prototype, 'first', {
  get: function() {
    return this[0];
  },
});


Object.defineProperty(Array.prototype, 'second', {
  get: function() {
    return this[1];
  },
});

Object.defineProperty(Array.prototype, 'third', {
  get: function() {
    return this[2];
  },
});

Object.defineProperty(Array.prototype, 'last', {
  get: function() {
    return this[this.length - 1];
  },
});
