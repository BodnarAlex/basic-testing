// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator, Action } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -5, b: 10, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: 20, b: 20, action: Action.Add })).toBe(40);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -5, b: 10, action: Action.Subtract })).toBe(
      -15,
    );
    expect(simpleCalculator({ a: 20, b: 20, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: 1, b: 5, action: Action.Multiply })).toBe(5);
    expect(simpleCalculator({ a: -2, b: 5, action: Action.Multiply })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: 2, b: -5, action: Action.Multiply })).toBe(
      -10,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
    expect(simpleCalculator({ a: 20, b: 1, action: Action.Divide })).toBe(20);
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 20, b: 200, action: Action.Divide })).toBe(
      0.1,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Exponentiate })).toBe(
      2,
    );
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate })).toBe(
      0.5,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Error })).toBeNull;
    expect(simpleCalculator({ a: 1, b: 1, action: '' })).toBeNull();
    expect(simpleCalculator({ a: 20, b: 13, action: 'count' })).toBeNull();
    expect(simpleCalculator({ a: 13, b: 13, action: 'work' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: '2', action: Action.Add })).toBeNull;
  });
  expect(
    simpleCalculator({ a: 2, b: '1', action: Action.Multiply }),
  ).toBeNull();
  expect(
    simpleCalculator({ a: '2', b: [1], action: Action.Divide }),
  ).toBeNull();
  expect(
    simpleCalculator({ a: 'err', b: 'err', action: Action.Exponentiate }),
  ).toBeNull();
});
