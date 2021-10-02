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
