import '../../operations/transformations';

describe('.unique', () => {
  const collection = [1, 2, 2, 3];

  test('it returns unique elements', () => {
    expect(collection.unique()).toEqual([1, 2, 3]);
  });
});

describe('.flat', () => {
  const collection = [[1, 2], [2, 3]];

  test('it returns a flat array', () => {
    expect(collection.flat()).toEqual([1, 2, 2, 3]);
  });
});

describe('.inGroups', () => {
  const collection = [1, 2, 2, 3];

  test('it returns grouped elements', () => {
    expect(collection.inGroups(2)).toEqual([[1, 2], [2, 3]]);
  });
});

describe('.occurrences', () => {
  const collection = [1, 2, 2, 3];

  test('creates a matrix with the entries and their occurrence', () => {
    expect(collection.occurrences()).toEqual([[1, 1], [2, 2], [3, 1]]);
  });
});

describe('.compact', () => {
  const collection = [1, undefined, null, '', 3];

  test('removes falsy values', () => {
    expect(collection.compact()).toEqual([1, 3]);
  });
});

describe('.zip', () => {
  const collection = [1, 2, 3];

  test('zip argument is too small', () => {
    expect(collection.zip(['a', 'b'])).toEqual([1, 'a', 2, 'b', 3, undefined]);
  });

  test('combines one argument', () => {
    expect(collection.zip(['a', 'b', 'c'])).toEqual([1, 'a', 2, 'b', 3, 'c']);
  });

  test('combines multiple argument', () => {
    expect(collection.zip(['a', 'b', 'c'], [4, 5, 6])).toEqual(
        [1, 'a', 4, 2, 'b', 5, 3, 'c', 6],
    );
  });
});
