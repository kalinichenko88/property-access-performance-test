import { setupButtons } from './buttons';
import { setupDatasets } from './datasets';
import { elements } from './elements';
import type { Data, DataCount } from './models';

import './style.css';

let datasets: Record<DataCount, Data[] | null> = {
  1000: null,
  5000: null,
  10000: null,
};

elements.log().textContent = `
Performance Test Runner
=======================
Ready to run tests...

`;

document.addEventListener('DOMContentLoaded', async () => {
  const { datasets: rawDatasets } = await setupDatasets({
    onLoaded: () => {
      elements.loading().classList.add('hidden');
      elements.log().classList.remove('hidden');

      elements.datasetSelect().classList.remove('hidden');
      elements.datasetSelect().classList.add('flex');

      elements.accessSelect().classList.remove('hidden');
      elements.accessSelect().classList.add('flex');

      elements.buttons().classList.remove('hidden');
      elements.buttons().classList.add('flex');

      elements.exportButtons().classList.remove('hidden');
      elements.exportButtons().classList.add('flex');
    },
  });

  datasets = rawDatasets;

  // Setup buttons with datasets
  setupButtons(datasets);
});
