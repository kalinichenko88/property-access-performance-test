/// <reference types="vite/client" />

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

type SnakeToCamelCaseKeys<T> = T extends Array<infer U>
  ? Array<SnakeToCamelCaseKeys<U>>
  : T extends object
    ? {
        [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseKeys<T[K]>;
      }
    : T;

type CamelToSnakeCaseKeys<T> = T extends Array<infer U>
  ? Array<CamelToSnakeCaseKeys<U>>
  : T extends object
    ? {
        [K in keyof T as CamelToSnakeCase<K & string>]: CamelToSnakeCaseKeys<T[K]>;
      }
    : T;
