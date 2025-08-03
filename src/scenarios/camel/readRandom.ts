import { CAMEL_CASE_FIELDS } from '../../constants';
import { convertToCamelCase } from '../../helpers';
import type { Scenario } from '../../models';

const readRandom: Scenario = (data) => {
  const convertedToCamelCase = convertToCamelCase(data);

  for (const obj of convertedToCamelCase) {
    const randomIndex = Math.floor(Math.random() * CAMEL_CASE_FIELDS.length);
    const v = obj[CAMEL_CASE_FIELDS[randomIndex]];
    void v;
  }
};

export default readRandom;
