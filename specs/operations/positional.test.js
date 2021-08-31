import '../../operations/positional';

describe('positional attributes', () => {
  const collection = [1, 2, 3, 4];

  test('it returns the first element', () => {
    expect(collection.first).toEqual(1);
  });

  test('it returns the second element', () => {
    expect(collection.second).toEqual(2);
  });

  test('it returns the third element', () => {
    expect(collection.third).toEqual(3);
  });

  test('it returns the last element', () => {
    expect(collection.last).toEqual(4);
  });
});
