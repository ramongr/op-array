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

Object.defineProperty(Array.prototype, 'fourth', {
  get: function() {
    return this[3];
  },
});

Object.defineProperty(Array.prototype, 'fifth', {
  get: function() {
    return this[4];
  },
});

Object.defineProperty(Array.prototype, 'sixth', {
  get: function() {
    return this[5];
  },
});

Object.defineProperty(Array.prototype, 'seventh', {
  get: function() {
    return this[6];
  },
});

Object.defineProperty(Array.prototype, 'eighth', {
  get: function() {
    return this[7];
  },
});

Object.defineProperty(Array.prototype, 'nineth', {
  get: function() {
    return this[8];
  },
});

Object.defineProperty(Array.prototype, 'tenth', {
  get: function() {
    return this[9];
  },
});

Object.defineProperty(Array.prototype, 'last', {
  get: function() {
    return this[this.length - 1];
  },
});

if (!Array.prototype.eql) {
  const smallerThan = (item, index) => item < array[index];
  const biggerThan = (item, index) => item > array[index];
  Array.prototype.eql = function(array) {
    const isSmaller = this.find(smallerThan) || this.length < array.length;
    const isBigger = this.find(biggerThan) || this.length > array.length;
    const equality = isBigger ? 1 : 0;

    return isSmaller ? -1 : equality;
  };
}
