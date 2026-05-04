// src/numerical/min.ts
function min(values) {
  return Math.min(...values);
}

// src/numerical/max.ts
function max(values) {
  return Math.max(...values);
}

// src/shared/arithmetic.ts
function addition(left, right) {
  return left + right;
}
function subtraction(left, right) {
  return left - right;
}
function multiplication(left, right) {
  return left * right;
}
function isEven(num) {
  return num % 2 === 0;
}

// src/numerical/sum.ts
function sum(values) {
  return values.reduce(addition, 0);
}

// src/numerical/subtract.ts
function subtract(values) {
  if (values.length === 0) {
    throw new TypeError("subtract: array must contain at least one number");
  }
  return values.reduce(subtraction);
}

// src/numerical/product.ts
function product(values) {
  if (values.length === 0) {
    throw new TypeError("product: array must contain at least one number");
  }
  return values.reduce(multiplication);
}

// src/numerical/average.ts
function average(values) {
  return sum(values) / values.length;
}

// src/numerical/hasEvenLength.ts
function hasEvenLength(values) {
  return isEven(values.length);
}

// src/numerical/median.ts
function median(values) {
  if (values.length === 0) {
    throw new TypeError("median: array must contain at least one number");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

// src/numerical/mode.ts
function mode(values) {
  if (values.length === 0) {
    return [];
  }
  const counts = /* @__PURE__ */ new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  let highest = 0;
  for (const count of counts.values()) {
    if (count > highest) {
      highest = count;
    }
  }
  const result = [];
  for (const [value, count] of counts) {
    if (count === highest) {
      result.push(value);
    }
  }
  return result;
}

export { average, hasEvenLength, max, median, min, mode, product, subtract, sum };
//# sourceMappingURL=numerical.js.map
//# sourceMappingURL=numerical.js.map