import { DATA_FIELDS } from '../../constants';
import type { Scenario } from '../../models';

const write: Scenario = (data) => {
  for (const obj of data) {
    for (let i = 0; i < DATA_FIELDS.length; i++) {
      (obj as Record<string, unknown>)[DATA_FIELDS[i]] = `test_${i}_${Date.now()}`;
    }
  }
};

export default write;
