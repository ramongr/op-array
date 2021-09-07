import {nestedObjectValue, objectFromKeys} from '../../shared/nested-object';

describe('.nestedObjectValue', () => {
  const item = {id: 1, user: {name: 'ID 1'}};

  test('simple path returning a value', () => {
    expect(nestedObjectValue(item, 'id')).toEqual(1);
  });

  test('simple path return an object', () => {
    expect(nestedObjectValue(item, 'user')).toEqual({name: 'ID 1'});
  });

  test('composed path return a value', () => {
    expect(nestedObjectValue(item, 'user.name')).toEqual('ID 1');
  });
});

describe('.objectFromKeys', () => {
  const item = {id: 1, name: 'ID 1'};

  test('with one key', () => {
    expect(objectFromKeys(item, ['id'])).toEqual({id: 1});
  });

  test('with both keys', () => {
    expect(objectFromKeys(item, ['id', 'name'])).toEqual(item);
  });

  test('with non existing keys', () => {
    expect(objectFromKeys(item, ['test'])).toEqual({test: undefined});
  });
});
