import { DATA_COUNTS } from './constants';
import { loadDataset } from './helpers';
import type { Data, DataCount } from './models';

type Props = {
  onLoaded: () => void;
};

type Result = {
  datasets: Record<DataCount, Data[] | null>;
};

const datasets: Result['datasets'] = {
  1000: null,
  5000: null,
  10000: null,
};

export const setupDatasets = async ({ onLoaded }: Props): Promise<Result> => {
  const [data_1000, data_5000, data_10000] = await Promise.all(DATA_COUNTS.map(loadDataset));
  datasets[1000] = data_1000;
  datasets[5000] = data_5000;
  datasets[10000] = data_10000;

  onLoaded();

  return {
    datasets: datasets,
  };
};
