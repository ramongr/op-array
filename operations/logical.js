if (!Array.prototype.intersection) {
  Array.prototype.intersection = function(arr) {
    return this.filter((item) => arr.indexOf(item) !== -1);
  };
}

if (!Array.prototype.exists) {
  Array.prototype.exists = function(itemOrArray = []) {
    if (this.length === 0) {
      return false;
    }
    const arr = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
    return this.intersection(arr).length === arr.length;
  };
}

if (!Array.prototype.except) {
  Array.prototype.except = function(itemOrArray) {
    const arr = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];

    return this.filter((item) => arr.indexOf(item) === -1);
  };
}

if (!Array.prototype.union) {
  Array.prototype.union = function(arr) {
    const unionizableArray = arr.except(this);

    return [...this, ...unionizableArray];
  };
}
