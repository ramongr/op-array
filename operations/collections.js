if (!Array.prototype.findBy) {
  Array.prototype.findBy = function(key, value) {
    return this.find((item) => item[key] === value);
  };
}

if (!Array.prototype.findById) {
  Array.prototype.findById = function(value) {
    return this.find(({id}) => id === value);
  };
}

if (!Array.prototype.where) {
  Array.prototype.where = function(key, value) {
    return this.filter((item) => item[key] === value);
  };
}
