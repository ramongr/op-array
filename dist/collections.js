"use strict";

if (!Array.prototype.findBy) {
  Array.prototype.findBy = function (key, value) {
    return this.find(function (item) {
      return item[key] === value;
    });
  };
}

if (!Array.prototype.findById) {
  Array.prototype.findById = function (value) {
    return this.find(function (_ref) {
      var id = _ref.id;
      return id === value;
    });
  };
}

if (!Array.prototype.where) {
  Array.prototype.where = function (key, value) {
    return this.filter(function (item) {
      return item[key] === value;
    });
  };
}