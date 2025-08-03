import { CAMEL_CASE_FIELDS } from '../../constants';
import { convertToCamelCase } from '../../helpers';
import type { Scenario } from '../../models';

const write: Scenario = (data) => {
  const convertedToCamelCase = convertToCamelCase(data);

  for (const obj of convertedToCamelCase) {
    for (let i = 0; i < CAMEL_CASE_FIELDS.length; i++) {
      (obj as Record<string, unknown>)[CAMEL_CASE_FIELDS[i]] = `test_${i}_${Date.now()}`;
    }
  }
};

export default write;
