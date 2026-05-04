// src/transformations/unique.ts
function unique(values) {
  return Array.from(new Set(values));
}

// src/transformations/flat.ts
function flat(values, depth = 1) {
  return values.flat(depth);
}

// src/transformations/inGroups.ts
function inGroups(values, groupCount) {
  if (groupCount <= 0 || !Number.isFinite(groupCount)) {
    throw new RangeError("inGroups: groupCount must be a positive integer");
  }
  const size = Math.ceil(values.length / groupCount);
  const groups = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push(values.slice(i * size, (i + 1) * size));
  }
  return groups;
}
function inGroupsOf(values, size) {
  if (size <= 0 || !Number.isFinite(size)) {
    throw new RangeError("inGroupsOf: size must be a positive integer");
  }
  const groups = [];
  for (let i = 0; i < values.length; i += size) {
    groups.push(values.slice(i, i + size));
  }
  return groups;
}

// src/transformations/occurrences.ts
function occurrences(values) {
  const counts = /* @__PURE__ */ new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts);
}

// src/transformations/compact.ts
function compact(values) {
  return values.filter((value) => Boolean(value));
}
function compactNullish(values) {
  return values.filter(
    (value) => value !== null && value !== void 0
  );
}

export { compact, compactNullish, flat, inGroups, inGroupsOf, occurrences, unique };
//# sourceMappingURL=transformations.js.map
//# sourceMappingURL=transformations.js.map