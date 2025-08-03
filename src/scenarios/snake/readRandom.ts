import { DATA_FIELDS } from '../../constants';
import type { Scenario } from '../../models';

const readRandom: Scenario = (data) => {
  for (const obj of data) {
    const randomIndex = Math.floor(Math.random() * DATA_FIELDS.length);
    const v = obj[DATA_FIELDS[randomIndex]];
    void v;
  }
};

export default readRandom;
