// Uncomment the code below and write your tests

import fs from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs');
jest.mock('fs/promises');

const time = 500;
const fileName = 'test.txt';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByTimeout(cb, time);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, time);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, time);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, time);
    expect(setInterval).toHaveBeenCalledWith(cb, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();

    doStuffByInterval(cb, time);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(fileName);

    expect(spy).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('notfound.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);

    const result = await readFileAsynchronously(fileName);
    expect(result).toBe(content);
  });
});
