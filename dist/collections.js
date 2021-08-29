"use strict";

var _nestedObject = require("../shared/nested-object");

Array.prototype.findBy = function (key, value) {
  return this.find(function (item) {
    return (0, _nestedObject.nestedObjectKey)(item, key) === value;
  });
};

Array.prototype.findById = function (value) {
  return this.find(function (_ref) {
    var id = _ref.id;
    return id === value;
  });
};

Array.prototype.where = function (key, value) {
  return this.filter(function (item) {
    return (0, _nestedObject.nestedObjectKey)(item, key) === value;
  });
};