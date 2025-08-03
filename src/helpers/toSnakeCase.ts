// the fastest version for most cases
export const toSnakeCase = (str: string): string => {
  if (!str) return str;

  let result = '';
  let prevWasLower = false;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    // check if the character is an uppercase letter (A-Z: 65-90)
    if (code >= 65 && code <= 90) {
      // add underscore only if the previous character was a lowercase letter
      if (prevWasLower) {
        result += '_';
      }
      // convert to lowercase (add 32 to the character code)
      result += String.fromCharCode(code + 32);
      prevWasLower = false;
    } else {
      result += str[i];
      prevWasLower = code >= 97 && code <= 122; // lowercase letters a-z
    }
  }

  return result;
};

// alternative 2: regex with pre-check
export const toSnakeCaseRegex = (str: string): string => {
  if (!str) return str;

  // quick check - if there are no uppercase letters, return as is
  let hasUpperCase = false;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      hasUpperCase = true;
      break;
    }
  }

  if (!hasUpperCase) return str;

  return str.replace(/([A-Z])/g, (letter: string) => `_${letter.toLowerCase()}`);
};

// alternative 3: cached version
const snakeCaseCache = new Map<string, string>();

export const toSnakeCaseCached = (str: string): string => {
  if (!str) return str;

  const cached = snakeCaseCache.get(str);
  if (cached !== undefined) {
    return cached;
  }

  let result = '';
  let prevWasLower = false;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    if (code >= 65 && code <= 90) {
      if (prevWasLower) {
        result += '_';
      }
      result += String.fromCharCode(code + 32);
      prevWasLower = false;
    } else {
      result += str[i];
      prevWasLower = code >= 97 && code <= 122;
    }
  }

  snakeCaseCache.set(str, result);
  return result;
};

// alternative 4: Uint8Array for maximum performance
export const toSnakeCaseUint8 = (str: string): string => {
  if (!str) return str;

  const codes = new Uint8Array(str.length);
  let resultLength = str.length;
  let hasUpperCase = false;

  // first pass: analyze the string
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    codes[i] = code;

    if (code >= 65 && code <= 90) {
      hasUpperCase = true;
      resultLength++; // additional space for underscore
    }
  }

  if (!hasUpperCase) return str;

  // second pass: build the result
  const result = new Uint8Array(resultLength);
  let resultIndex = 0;
  let prevWasLower = false;

  for (let i = 0; i < str.length; i++) {
    const code = codes[i];

    if (code >= 65 && code <= 90) {
      if (prevWasLower) {
        result[resultIndex++] = 95; // '_'
      }
      result[resultIndex++] = code + 32; // строчная буква
      prevWasLower = false;
    } else {
      result[resultIndex++] = code;
      prevWasLower = code >= 97 && code <= 122;
    }
  }

  return String.fromCharCode.apply(null, Array.from(result.slice(0, resultIndex)));
};
