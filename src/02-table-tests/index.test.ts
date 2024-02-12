// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 20, b: 20, action: Action.Add, expected: 40 },
  { a: -5, b: 10, action: Action.Add, expected: 5 },

  { a: 20, b: 20, action: Action.Subtract, expected: 0 },
  { a: 20, b: 5, action: Action.Subtract, expected: 15 },
  { a: 5, b: 20, action: Action.Subtract, expected: -15 },
  { a: 20, b: 0, action: Action.Subtract, expected: 20 },

  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 1, b: 5, action: Action.Multiply, expected: 5 },
  { a: -2, b: 5, action: Action.Multiply, expected: -10 },
  { a: 2, b: -5, action: Action.Multiply, expected: -10 },

  { a: 20, b: 20, action: Action.Divide, expected: 1 },
  { a: 20, b: 1, action: Action.Divide, expected: 20 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 20, b: 200, action: Action.Divide, expected: 0.1 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },

  { a: 13, b: 20, action: 'error', expected: null },
  { a: 1, b: 1, action: '', expected: null },
  { a: 20, b: 13, action: 'count', expected: null },
  { a: 13, b: 13, action: 'work', expected: null },

  { a: "1", b: 2, action: Action.Add, expected: null },
  { a: 2, b: "1", action: Action.Multiply, expected: null },
  { a: "2", b: [1], action: Action.Divide, expected: null },
  { a: "err", b: "err", action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests

  test.each(testCases)(
    'accepts arguments: a, b and action - return expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  )
});
