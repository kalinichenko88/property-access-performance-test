import { toSnakeCase } from './toSnakeCase';

export const createSmartProxy = <T extends Record<string, unknown>>(obj: T): SnakeToCamelCaseKeys<T> => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (typeof prop !== 'string') {
        return Reflect.get(target, prop, receiver);
      }

      const snakeKey = toSnakeCase(prop);

      if (snakeKey in target) {
        const value = target[snakeKey as keyof typeof target];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return createSmartProxy(value as T);
        }

        return value;
      }

      return undefined;
    },

    set(target, prop, value, receiver) {
      if (typeof prop !== 'string') {
        return Reflect.set(target, prop, value, receiver);
      }

      const snakeKey = toSnakeCase(prop);
      target[snakeKey as keyof typeof target] = value;
      return true;
    },
  }) as SnakeToCamelCaseKeys<T>;
};
