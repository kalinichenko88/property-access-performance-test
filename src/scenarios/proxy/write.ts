import { CAMEL_CASE_FIELDS } from '../../constants';
import { createSmartProxy } from '../../helpers/createSmartProxy';
import type { Data } from '../../models';

const write = (data: Data[]) => {
  const proxiedData = data.map((obj) => createSmartProxy(obj));

  for (const obj of proxiedData) {
    for (let i = 0; i < CAMEL_CASE_FIELDS.length; i++) {
      (obj as Record<string, unknown>)[CAMEL_CASE_FIELDS[i]] = `test_${i}_${Date.now()}`;
    }
  }
};

export default write;
