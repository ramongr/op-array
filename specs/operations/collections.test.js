// import '../../operations/collections';
require('../../operations/collections');

const collection = [
  {id: 1, name: 'ID 1'}, {id: 2, name: 'ID 2'}, {id: 3, name: 'ID 3'},
  {id: 3, name: 'ID 1'}, {id: 4, name: 'ID 2'}, {id: 5, name: 'ID 3'},
];


describe('.findBy', () => {
  describe('when there is a key and value to find', () => {
    test('it returns a result', () => {
      expect(collection.findBy('id', 1)).toBeTruthy();
    });

    test('it returns the array item', () => {
      expect(collection.findBy('id', 1))
          .toEqual({id: 1, name: 'ID 1'});
    });
  });

  describe('when there no key to find', () => {
    test('it returns undefined', () => {
      expect(collection.findBy('test', 1)).toBeUndefined();
    });
  });
});

describe('.findById', () => {
  describe('when there is a key and value to find', () => {
    test('it returns a result', () => {
      expect(collection.findById(1)).toBeTruthy();
    });

    test('it returns the array item', () => {
      expect(collection.findById(1))
          .toEqual({id: 1, name: 'ID 1'});
    });
  });

  describe('when there no value to find', () => {
    test('it returns undefined', () => {
      expect(collection.findById(-1)).toBeUndefined();
    });
  });
});

describe('.where', () => {
  describe('when there is a key and value to find', () => {
    test('it returns a result', () => {
      expect(collection.where('id', 1)).toBeTruthy();
    });

    test('it has a length with size one', () => {
      expect(collection.where('id', 1)).toHaveLength(1);
    });

    test('it returns the array item', () => {
      expect(collection.where('id', 1))
          .toEqual([{id: 1, name: 'ID 1'}]);
    });
  });

  describe('when there no value to find', () => {
    test('it returns undefined', () => {
      expect(collection.where('id', -1)).toEqual([]);
    });
  });
});


describe('.extract', () => {
  describe('when there is a key to extract', () => {
    test('it returns a result', () => {
      expect(collection.extract('id'))
        .toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 3}, {id: 4}, {id: 5}]);
    });
  });

  describe('when there no value to find', () => {
    test('it returns undefined', () => {
      expect(collection.extract('test')).toEqual([
        {test: undefined}, {test: undefined}, {test: undefined},
        {test: undefined}, {test: undefined}, {test: undefined},
      ]);
    });
  });
});
