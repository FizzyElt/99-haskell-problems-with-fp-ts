import { Eq } from 'fp-ts/Eq';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as N from 'fp-ts/number';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as S from 'fp-ts/string';
import { flow, pipe, identity, tuple } from 'fp-ts/function';

// Problem 1
export const myLast = A.last;

// Problem 2
export const myButLast = flow(A.init, O.flatMap(A.last));

// Problem 3
export const elementAt = (value: Array<unknown> | string, index: number) =>
  pipe(S.isString(value) ? [...value] : value, A.lookup(index - 1));

// Problem 4
export const myLength = (value: Array<unknown> | string) =>
  pipe(S.isString(value) ? [...value] : value, A.size);

// Problem 5
export const myReverse = A.reverse;

// Problem 6
export const isPalindrome = (arr: Array<number> | string) =>
  pipe(S.isString(arr) ? [...arr] : arr, (value) => {
    const reversed = A.reverse<number | string>(value);
    return pipe(
      A.makeBy(A.size(reversed), identity),
      A.every((i) =>
        pipe(
          O.Do,
          O.bind('a', () => A.lookup(i)(value as (string | number)[])),
          O.bind('b', () => A.lookup(i)(reversed)),
          O.filter(({ a, b }) => a === b),
          O.isSome
        )
      )
    );
  });

// Problem 7
export const myFlatten = A.reduce<unknown, unknown[]>([], (acc, item) => {
  if (Array.isArray(item)) {
    return A.concat(myFlatten(item))(acc);
  }
  return A.append(item)(acc);
}) as (arr: unknown[]) => unknown[];

// Problem 8
export const compress = (value: number[] | string) => {
  const isString = S.isString(value);

  const arr = [...value];

  const res = pipe(
    arr,
    A.reduce<string | number, (number | string)[]>([], (acc, item) =>
      pipe(
        A.last(acc),
        O.filter((last) => last === item),
        O.match(
          () => [...acc, item],
          () => acc
        )
      )
    )
  );

  return isString ? res.join('') : res;
};

// Problem 9
export const pack = <T = string | number>(value: T[]) => {
  return pipe(
    NEA.fromArray(value),
    O.map((arr) => {
      const isString = S.isString(arr[0]);

      if (isString) {
        const res: Array<string> = pipe(
          arr as NEA.NonEmptyArray<string>,
          NEA.chop((as) => {
            const { init, rest } = pipe(
              as,
              A.spanLeft((v) => S.Eq.equals(v, as[0]))
            );
            return [init, rest];
          }),
          NEA.map((arr) => arr.join(''))
        );
        return res;
      }

      return pipe(
        arr as NEA.NonEmptyArray<number>,
        NEA.chop((as) => {
          const { init, rest } = pipe(
            as,
            A.spanLeft((v) => N.Eq.equals(v, as[0]))
          );
          return [init, rest];
        })
      ) as Array<Array<number>>;
    }),
    O.getOrElse(() => [] as Array<Array<number>> | Array<string>)
  );
};

// Problem 10
export const encode = (str: string) =>
  pipe(
    [...str],
    A.reduce<string, [number, string][]>([], (acc, item) =>
      pipe(
        O.of(acc),
        O.filter(A.isNonEmpty),
        O.filter(flow(NEA.last, ([_, value]) => S.Eq.equals(value, item))),
        O.map((arr) => {
          const [count, value] = NEA.last(arr);

          return pipe(arr, NEA.init, A.append(tuple(count + 1, value)));
        }),
        O.getOrElse(() => A.append(tuple(1, item))(acc))
      )
    )
  );
