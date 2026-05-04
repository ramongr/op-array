// src/logical/intersection.ts
function intersection(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item));
}

// src/logical/except.ts
function except(source, excluded) {
  const excludedSet = new Set(excluded);
  return source.filter((item) => !excludedSet.has(item));
}

// src/logical/union.ts
function union(left, right) {
  return Array.from(/* @__PURE__ */ new Set([...left, ...right]));
}

// src/logical/exists.ts
function exists(source, item) {
  return source.includes(item);
}
function existsAll(source, items) {
  if (source.length === 0) {
    return false;
  }
  const sourceSet = new Set(source);
  return items.every((item) => sourceSet.has(item));
}

export { except, exists, existsAll, intersection, union };
//# sourceMappingURL=logical.js.map
//# sourceMappingURL=logical.js.map