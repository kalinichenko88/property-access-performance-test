import { elements } from './elements';
import { exportToCSV } from './helpers/analyzeResults';
import type { Data, DataCount } from './models';
import { createRunner } from './runner';
import { readAll as camelReadAll, readRandom as camelReadRandom, write as camelWrite } from './scenarios/camel';
import { readAll as proxyReadAll, readRandom as proxyReadRandom, write as proxyWrite } from './scenarios/proxy';
import { readAll as snakeReadAll, readRandom as snakeReadRandom, write as snakeWrite } from './scenarios/snake';

export const setupButtons = (datasets: Record<DataCount, Data[] | null>) => {
  const runner = createRunner({ iterations: 3, warmupRuns: 1 });

  const readSeqBtn = elements.btnReadSeq();
  const readRndBtn = elements.btnReadRnd();
  const writeBtn = elements.btnWrite();

  const disableButtons = (): void => {
    readSeqBtn.disabled = true;
    readRndBtn.disabled = true;
    writeBtn.disabled = true;
  };

  const enableButtons = (): void => {
    readSeqBtn.disabled = false;
    readRndBtn.disabled = false;
    writeBtn.disabled = false;
  };

  const getSelectedDataset = (): Data[] | null => {
    const datasetSelect = document.getElementById('dataset') as HTMLSelectElement;
    const size = parseInt(datasetSelect.value) as DataCount;
    return datasets[size];
  };

  const getSelectedAccess = (): string => {
    const accessSelect = document.getElementById('access') as HTMLSelectElement;
    return accessSelect.value;
  };

  const getScenario = (access: string, operation: string) => {
    const scenarios = {
      snake: {
        'read-seq': snakeReadAll,
        'read-rnd': snakeReadRandom,
        write: snakeWrite,
      },
      camel: {
        'read-seq': camelReadAll,
        'read-rnd': camelReadRandom,
        write: camelWrite,
      },
      proxy: {
        'read-seq': proxyReadAll,
        'read-rnd': proxyReadRandom,
        write: proxyWrite,
      },
    };

    return scenarios[access as keyof typeof scenarios]?.[operation as keyof typeof scenarios.snake];
  };

  const runTest = async (operation: string) => {
    if (runner.isTestRunning()) {
      return;
    }

    const dataset = getSelectedDataset();
    const access = getSelectedAccess();
    const scenario = getScenario(access, operation);

    if (!dataset || !scenario) {
      console.error('Invalid dataset or scenario');
      return;
    }

    disableButtons();

    try {
      const datasetSelect = document.getElementById('dataset') as HTMLSelectElement;
      const size = parseInt(datasetSelect.value) as DataCount;

      await runner.runTest(scenario, dataset, access, size, operation);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      enableButtons();
    }
  };

  readSeqBtn.addEventListener('click', () => {
    runTest('read-seq');
  });

  readRndBtn.addEventListener('click', () => {
    runTest('read-rnd');
  });

  writeBtn.addEventListener('click', () => {
    runTest('write');
  });

  // Export functionality
  const exportJsonBtn = elements.btnExportJson();
  const exportCsvBtn = elements.btnExportCsv();
  const clearResultsBtn = elements.btnClearResults();

  exportJsonBtn.addEventListener('click', () => {
    const results = runner.getResults();
    if (results.length === 0) {
      alert('No results to export');
      return;
    }

    const jsonData = runner.exportResults();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  exportCsvBtn.addEventListener('click', () => {
    const results = runner.getResults();
    if (results.length === 0) {
      alert('No results to export');
      return;
    }

    const csvData = exportToCSV(results);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  clearResultsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all results?')) {
      runner.clearResults();
    }
  });
};
