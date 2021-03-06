import './transformations';
import './positional';
import {
  addition, halfPoint, isEven, multiplication, subtraction,
} from '../shared/arithmetic';

if (!Array.prototype.min) {
  Array.prototype.min = function() {
    return Math.min(...this);
  };
}

if (!Array.prototype.max) {
  Array.prototype.max = function() {
    return Math.max(...this);
  };
}


if (!Array.prototype.sum) {
  Array.prototype.sum = function() {
    return this.reduce(addition, 0);
  }
}

if (!Array.prototype.subtraction) {
  Array.prototype.subtraction = function() {
    return this.reduce(subtraction);
  }
}

if (!Array.prototype.product) {
  Array.prototype.product = function() {
    return this.reduce(multiplication);
  }
}

if (!Array.prototype.average) {
  Array.prototype.average = function() {
    return this.sum() / this.length;
  };
}

if (!Array.prototype.isEvenLength) {
  Array.prototype.isEvenLength = function() {
    return isEven(this.length);
  };
}

if (!Array.prototype.median) {
  Array.prototype.median = function() {
    const sortedArray = this.sort();
    const half = halfPoint(this.length);
    const median = sortedArray[half - 1];

    if (this.isEvenLength()) {
      return ((median + sortedArray[half]) / 2);
    }

    return median;
  };
}

if (!Array.prototype.mode) {
  const firstIndices = (arr) => arr.first;
  const secondIndices = (arr) => arr.second;

  Array.prototype.mode = function() {
    const occurrences = this.occurrences();
    const maxOccurenceTime = occurrences.map(secondIndices).max();
    const findValueByOccurrence = ([_, times]) => times === maxOccurenceTime;

    return occurrences.filter(findValueByOccurrence).map(firstIndices);
  };
}