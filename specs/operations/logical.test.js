import '../../operations/logical';

describe('.intersection', () => {
  const firstArray = [1, 2, 3];

  describe('when there are no entries in common', () => {
    const secondArray = [4, 5, 6];

    test('it returns an empty array', () => {
      expect(firstArray.intersection(secondArray)).toEqual([]);
    });
  });

  describe('when there are entries in common', () => {
    const secondArray = [2, 3, 4];

    test('it returns a list of common entries', () => {
      expect(firstArray.intersection(secondArray)).toEqual([2, 3]);
    });
  });
});

describe('.exists', () => {
  const firstArray = [1, 2, 3];

  describe('when the entry does not exist', () => {
    test('it returns false', () => {
      expect(firstArray.exists(4)).toBeFalsy();
    });
  });

  describe('when the are no matching entries', () => {
    test('it returns false', () => {
      expect(firstArray.exists([4, 5])).toBeFalsy();
    });
  });

  describe('when the entry matches', () => {
    test('it returns true', () => {
      expect(firstArray.exists(2)).toBeTruthy();
    });
  });

  describe('when all the entries match', () => {
    test('it returns true', () => {
      expect(firstArray.exists([1, 2])).toBeTruthy();
    });
  });

  describe('when some entries match', () => {
    test('it returns false', () => {
      expect(firstArray.exists([1, 4])).toBeFalsy();
    });
  });
});

describe('.except', () => {
  const firstArray = [1, 2, 3];

  describe('when the entry does not exist', () => {
    test('it returns the same array', () => {
      expect(firstArray.except(4)).toEqual(firstArray);
    });
  });

  describe('when the are no matching entries', () => {
    test('it returns the same array', () => {
      expect(firstArray.except([4, 5])).toEqual(firstArray);
    });
  });

  describe('when the entry matches', () => {
    test('the entry is removed from the array', () => {
      expect(firstArray.except(2)).toEqual([1, 3]);
    });
  });

  describe('when all the entries match', () => {
    test('it returns true', () => {
      expect(firstArray.except([1, 2])).toEqual([3]);
    });
  });

  describe('when some entries match', () => {
    test('it returns false', () => {
      expect(firstArray.except([1, 4])).toEqual([2, 3]);
    });
  });
});

describe('.union', () => {
  const firstArray = [1, 2, 3];

  describe('when the are no matching entries', () => {
    test('it returns both arrays combined', () => {
      expect(firstArray.union([4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('when all the entries match', () => {
    test('it returns the original array', () => {
      expect(firstArray.union([1, 2])).toEqual(firstArray);
    });
  });

  describe('when some entries match', () => {
    test('it returns false', () => {
      expect(firstArray.union([1, 4])).toEqual([1, 2, 3, 4]);
    });
  });
});
