export const toSnakeCase = (str: string): string => {
  return str.replace(/([A-Z])/g, (letter: string) => `_${letter.toLowerCase()}`);
};
