import { CAMEL_CASE_FIELDS } from '../../constants';
import { convertToCamelCase } from '../../helpers';
import type { Scenario } from '../../models';

const readAll: Scenario = (data) => {
  const convertedToCamelCase = convertToCamelCase(data);

  for (const obj of convertedToCamelCase) {
    for (let i = 0; i < CAMEL_CASE_FIELDS.length; i++) {
      const v = obj[CAMEL_CASE_FIELDS[i]];
      void v;
    }
  }
};

export default readAll;
