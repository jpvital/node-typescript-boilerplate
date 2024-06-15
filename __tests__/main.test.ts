import { Delays, arrayDeepCopy, greeter } from '../src/main.js';

describe('greeter function', () => {
  const name = 'John';
  let hello: string;

  let timeoutSpy: jest.SpyInstance;

  // Act before assertions
  beforeAll(async () => {
    // Read more about fake timers
    // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
    // Jest 27 now uses "modern" implementation of fake timers
    // https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults
    // https://github.com/facebook/jest/pull/5171
    jest.useFakeTimers();
    timeoutSpy = jest.spyOn(global, 'setTimeout');

    const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    hello = await p;
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    timeoutSpy.mockRestore();
  });

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      Delays.Long,
    );
  });

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});

describe('arrayDeepCopy function', () => {
  const array = [
    { key: 'value' },
    [{ key: 'value' }],
    { key: [{ key: 'value' }] },
  ];

  let copy = [];

  beforeAll(() => {
    copy = arrayDeepCopy(array);
  });

  it('performs a deep copy of an array', () => {
    expect(copy).toEqual(array);
    expect(copy).not.toBe(array);
  });

  it('performs a deep copy of each item in the array', () => {
    expect(copy[0]).toEqual(array[0]);
    expect(copy[0]).not.toBe(array[0]);

    expect(copy[1]).toEqual(array[1]);
    expect(copy[1]).not.toBe(array[1]);

    expect(copy[2]).toEqual(array[2]);
    expect(copy[2]).not.toBe(array[2]);
  });
});
