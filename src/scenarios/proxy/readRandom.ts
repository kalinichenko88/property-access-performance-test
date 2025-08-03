import { CAMEL_CASE_FIELDS } from '../../constants';
import { createSmartProxy } from '../../helpers/createSmartProxy';
import type { Data } from '../../models';

const readRandom = (data: Data[]) => {
  const proxiedData = data.map((obj) => createSmartProxy(obj));

  for (const obj of proxiedData) {
    const randomIndex = Math.floor(Math.random() * CAMEL_CASE_FIELDS.length);
    const v = (obj as Record<string, unknown>)[CAMEL_CASE_FIELDS[randomIndex]];
    void v;
  }
};

export default readRandom;
