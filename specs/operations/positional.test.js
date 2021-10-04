import '../../operations/positional';

describe('positional attributes', () => {
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('it returns the first element', () => {
    expect(collection.first).toEqual(1);
  });

  test('it returns the second element', () => {
    expect(collection.second).toEqual(2);
  });

  test('it returns the third element', () => {
    expect(collection.third).toEqual(3);
  });

  test('it returns the fourth element', () => {
    expect(collection.fourth).toEqual(4);
  });

  test('it returns the fifth element', () => {
    expect(collection.fifth).toEqual(5);
  });

  test('it returns the sixth element', () => {
    expect(collection.sixth).toEqual(6);
  });

  test('it returns the seventh element', () => {
    expect(collection.seventh).toEqual(7);
  });

  test('it returns the eighth element', () => {
    expect(collection.eighth).toEqual(8);
  });

  test('it returns the nineth element', () => {
    expect(collection.nineth).toEqual(9);
  });

  test('it returns the tenth element', () => {
    expect(collection.tenth).toEqual(10);
  });

  test('it returns the last element', () => {
    expect(collection.last).toEqual(10);
  });
});
