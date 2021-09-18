/**
 * Navigates through the object to get to the correct value
 * @param {Object} obj
 * @param {string} path
 * @return {any}
 */
export function nestedObjectValue(obj, path) {
  const paths = path.split('.');
  return paths.reduce((result, path) => result[path], obj);
};

/**
 * Creates a new object with filtered keys from the incoming object
 * @param {Object} item
 * @param {Array} keys
 * @return {Object}
 */
export function objectFromKeys(item, keys) {
  return keys.reduce((obj, key) => ({...obj, [key]: item[key]}), {});
};
