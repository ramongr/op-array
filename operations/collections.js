import {nestedObjectKey} from '../shared/nested-object';

Array.prototype.findBy = function(key, value) {
  return this.find((item) => nestedObjectKey(item, key) === value);
};

Array.prototype.findById = function(value) {
  return this.find(({id}) => id === value);
};

Array.prototype.where = function(key, value) {
  return this.filter((item) => nestedObjectKey(item, key) === value);
};

