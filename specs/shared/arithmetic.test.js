import {
  addition, halfPoint, isEven, isOdd, multiplication, subtraction
} from '../../shared/arithmetic';

describe('addition, multiplication, subtraction', () => {
  test('it adds two numbers', () => {
    expect(addition(1, 2)).toBe(3);
  });

  test('it multiplies two numbers', () => {
    expect(multiplication(1, 2)).toBe(2);
  });

  test('it subtracts two numbers', () => {
    expect(subtraction(2, 1)).toBe(1);
  });
});

describe('halfPoint', () => {
  describe('even numbers', () => {
    test('returns the halved amount', () => {
      expect(halfPoint(6)).toBe(3);
    });
  });

  describe('odd numbers', () => {
    test('returns a rounded up halved amount', () => {
      expect(halfPoint(3)).toBe(2);
    });
  });
});

describe('isEven, isOdd', () => {
  test('returns true', () => {
    expect(isEven(2)).toBeTruthy();
    expect(isOdd(3)).toBeTruthy();
  });

  test('returns false', () => {
    expect(isOdd(2)).toBeFalsy();
    expect(isEven(3)).toBeFalsy();
  });
});
