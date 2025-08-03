import { DATA_FIELDS } from '../../constants';
import type { Scenario } from '../../models';

const readAll: Scenario = (data) => {
  for (const obj of data) {
    for (let i = 0; i < DATA_FIELDS.length; i++) {
      const v = obj[DATA_FIELDS[i]];
      void v;
    }
  }
};

export default readAll;
