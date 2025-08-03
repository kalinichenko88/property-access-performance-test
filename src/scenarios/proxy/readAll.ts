import { CAMEL_CASE_FIELDS } from '../../constants';
import { createSmartProxy } from '../../helpers/createSmartProxy';
import type { Data } from '../../models';

const readAll = (data: Data[]) => {
  const proxiedData = data.map((obj) => createSmartProxy(obj));

  for (const obj of proxiedData) {
    for (let i = 0; i < CAMEL_CASE_FIELDS.length; i++) {
      const v = (obj as Record<string, unknown>)[CAMEL_CASE_FIELDS[i]];
      void v;
    }
  }
};

export default readAll;
