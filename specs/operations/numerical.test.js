import '../../operations/numerical';

describe('.min', () => {
  const collection = [1, 2, 3];

  test('it returns the smallest number', () => {
    expect(collection.min()).toEqual(1);
  });
});

describe('.max', () => {
  const collection = [1, 2, 3];

  test('it returns the biggest number', () => {
    expect(collection.max()).toEqual(3);
  });
});

describe('.sum', () => {
  const collection = [1, 2, 3];

  test('it sums the array', () => {
    expect(collection.sum()).toEqual(6);
  });
});

describe('.subtraction', () => {
  const collection = [3, 2, 1];

  test('it subtracts the array', () => {
    expect(collection.subtraction()).toEqual(0);
  });
});

describe('.product', () => {
  const collection = [3, 2, 1];

  test('it multiplies the array', () => {
    expect(collection.product()).toEqual(6);
  });
});

describe('.average', () => {
  const collection = [3, 2, 1];

  test('it gets the arithmetic average', () => {
    expect(collection.average()).toEqual(2);
  });
});

describe('.median', () => {
  const collection = [3, 2, 1];
  const anotherCollection = [3, 4, 2, 1];

  test('it gets the median value', () => {
    expect(collection.median()).toEqual(2);
  });

  test('it gets the median value', () => {
    expect(anotherCollection.median()).toEqual(2.5);
  });
});

describe('.mode', () => {
  const collection = [3, 2, 1];
  const anotherCollection = [3, 3, 4, 2, 1];

  test('it gets the mode value', () => {
    expect(collection.mode()).toEqual([3, 2, 1]);
  });

  test('it gets the mode value', () => {
    expect(anotherCollection.mode()).toEqual([3]);
  });
});
