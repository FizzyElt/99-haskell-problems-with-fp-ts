import {
  myLast,
  myButLast,
  elementAt,
  myLength,
  myReverse,
  isPalindrome,
  myFlatten,
  compress,
  pack,
  encode,
} from '@module/one_to_ten';
import * as O from 'fp-ts/Option';
import { describe, it, expect } from 'vitest';

describe.concurrent('1 to 10', () => {
  it('problem 1', () => {
    expect(myLast([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual(O.some(10));
    expect(myLast([])).toStrictEqual(O.none);
  });

  it('problem 2', () => {
    expect(myButLast([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual(O.some(9));
    expect(myButLast([])).toStrictEqual(O.none);
    expect(myButLast([2])).toStrictEqual(O.none);
  });

  it('problem 3', () => {
    expect(elementAt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)).toStrictEqual(O.some(10));
    expect(elementAt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0)).toStrictEqual(O.none);
    expect(elementAt([], 1)).toStrictEqual(O.none);
  });

  it('problem 4', () => {
    expect(myLength([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
    expect(myLength([1, 2, 3, 4, 5, 6])).toBe(6);
    expect(myLength([])).toBe(0);
  });

  it('problem 5', () => {
    expect(myReverse([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual([
      10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ]);
    expect(myReverse([1, 2, 3, 4, 5, 6])).toStrictEqual([6, 5, 4, 3, 2, 1]);
    expect(myReverse([])).toStrictEqual([]);
  });

  it('problem 6', () => {
    expect(isPalindrome([1, 2, 3, 4, 3, 2, 1])).toBeTruthy();
    expect(isPalindrome([1, 2, 3, 3, 2, 1])).toBeTruthy();
    expect(isPalindrome([1, 2, 3, 4, 2, 1])).toBeFalsy();
    expect(isPalindrome('abccba')).toBeTruthy();
    expect(isPalindrome('accba')).toBeFalsy();
  });

  it('problem 7', () => {
    expect(myFlatten([1, [2, 3], 4, [3, 2, [1]]])).toStrictEqual([1, 2, 3, 4, 3, 2, 1]);
    expect(myFlatten([1, 2, [3, 3, 2], 1])).toStrictEqual([1, 2, 3, 3, 2, 1]);
  });

  it('problem 8', () => {
    expect(compress('aaaaammmddd')).toBe('amd');
    expect(compress([1, 2, 2, 1])).toStrictEqual([1, 2, 1]);
  });

  it('problem 9', () => {
    expect(pack([1, 1, 3, 3, 4, 4, 5, 5, 5])).toStrictEqual([
      [1, 1],
      [3, 3],
      [4, 4],
      [5, 5, 5],
    ]);
    expect(pack(['a', 'a', 'b', 'b', 'c', 'c', 'c'])).toStrictEqual(['aa', 'bb', 'ccc']);
  });

  it('problem 10', () => {
    expect(encode('aaacccddsss')).toStrictEqual([
      [3, 'a'],
      [3, 'c'],
      [2, 'd'],
      [3, 's'],
    ]);
    expect(encode('')).toStrictEqual([]);
  });
});
