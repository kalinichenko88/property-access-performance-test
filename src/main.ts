import { setupButtons } from './buttons';
import { setupDatasets } from './datasets';
import { elements } from './elements';

import './style.css';

elements.log().textContent = `
Performance Test Runner
=======================
Ready to run tests...

`;

document.addEventListener('DOMContentLoaded', async () => {
  const { datasets } = await setupDatasets({
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

  // Setup buttons with datasets
  setupButtons(datasets);
});
