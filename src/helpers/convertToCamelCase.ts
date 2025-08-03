import { camelKeys } from 'js-convert-case';
import type { Options } from 'js-convert-case/lib/modules/extends/utils';

export const convertToCamelCase = <T>(
  data: T,
  opt: Options = { recursive: true, recursiveInArray: true },
): SnakeToCamelCaseKeys<T> => {
  if (Array.isArray(data)) {
    return data.map((item) => camelKeys(item, opt)) as unknown as SnakeToCamelCaseKeys<T>;
  }

  return camelKeys(data, opt) as unknown as SnakeToCamelCaseKeys<T>;
};
