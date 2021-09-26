import {falseyValues} from "../shared/empty-values";

if (!Array.prototype.unique) {
  Array.prototype.unique = function() {
    return Array.from(new Set(this));
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function() {
    return this.reduce((flatArray, array) => [...flatArray, ...array]);
  };
}

if (!Array.prototype.intervals) {
  Array.prototype.intervals = function(amount) {
    const offset = Math.ceil(this.length / amount);

    return this.reduce((offsets, _, index) => {
      if (index === 0 || index % offset === 0) {
        offsets.push([index, index + offset]);
      }

      return offsets;
    }, []);
  };
}

if (!Array.prototype.inGroups) {
  Array.prototype.inGroups = function(amount) {
    return this
        .intervals(amount)
        .map(([firstIndex, lastIndex]) => {
          return this.slice(firstIndex, lastIndex);
        });
  };
}

if (!Array.prototype.occurrences) {
  Array.prototype.occurrences = function() {
    const occurrences = new Map();
    this.forEach((item) => {
      const itemValue = occurrences.get(item);
      if (itemValue === undefined) {
        occurrences.set(item, 1);
      } else {
        occurrences.set(item, itemValue + 1);
      }
    });
    return Array.from(occurrences);
  };
}

if (!Array.prototype.compact) {
  Array.prototype.compact = function() {
    return this.filter(falseyValues);
  };
}
