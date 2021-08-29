import { nestedObjectKey } from "../shared/nested-object";

Array.prototype.findBy = function(key, value) {
  return this.find((item) => item[key] === value);
};

Array.prototype.findById = function(value) {
  return this.find(({id}) => id === value);
};

Array.prototype.where = function(key, value) {
  return this.filter((item) => item[key] === value);
};

/*
[
  {id: 1, email: 'comp@company.com', users: {name: 'Ramon'}},
]
*/

Array.prototype.nestedWhere = function(nestedKey, value) {
  return this.filter((item) => nestedObjectKey(item, nestedKey) === value);
};
