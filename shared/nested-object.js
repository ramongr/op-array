export const nestedObjectKey = (obj, path) => {
  const paths = path.split('.');
  return paths.reduce((result, path) => result[path], obj);
};
