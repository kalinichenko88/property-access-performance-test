import type { Data, DataCount } from '../models';

export const loadDataset = async (count: DataCount): Promise<Data[]> => {
  const data = await import(`../data/${count.toLocaleString().replace(',', '_')}/data.json`);

  return data.default;
};
