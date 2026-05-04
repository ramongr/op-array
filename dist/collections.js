// src/shared/nestedObject.ts
function nestedObjectValue(obj, path) {
  const segments = path.split(".");
  let current = obj;
  for (const segment of segments) {
    if (current === null || current === void 0) {
      return void 0;
    }
    current = current[segment];
  }
  return current;
}
function objectFromKeys(source, keys) {
  const result = {};
  for (const key of keys) {
    result[key] = source[key];
  }
  return result;
}

// src/collections/findBy.ts
function findBy(collection, key, value) {
  return collection.find((item) => nestedObjectValue(item, key) === value);
}

// src/collections/findById.ts
function findById(collection, value) {
  return collection.find((item) => item.id === value);
}

// src/collections/where.ts
function where(collection, key, value) {
  return collection.filter((item) => nestedObjectValue(item, key) === value);
}

// src/collections/extract.ts
function extract(collection, keys) {
  return collection.map((item) => objectFromKeys(item, keys));
}

export { extract, findBy, findById, where };
//# sourceMappingURL=collections.js.map
//# sourceMappingURL=collections.js.map