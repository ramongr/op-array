/**
 * Checks if a given value is an empty or "falsey" value
 * @param {any} value
 * @return {boolean}
 */
export function falseyValues(value) {
  const emptyValues = ['', null, undefined];

  return !emptyValues.includes(value) && JSON.stringify(value) !== '{}';
};

