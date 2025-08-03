const getElement = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Element with id ${id} not found`);
  }

  return element as T;
};

export const elements = {
  loading: () => getElement<HTMLDivElement>('loading'),
  loadingText: () => getElement<HTMLSpanElement>('loading-text'),
  log: () => getElement<HTMLPreElement>('log'),
  datasetSelect: () => getElement<HTMLDivElement>('dataset-select'),
  accessSelect: () => getElement<HTMLDivElement>('access-select'),
  buttons: () => getElement<HTMLDivElement>('buttons'),
  exportButtons: () => getElement<HTMLDivElement>('export-buttons'),
  btnReadSeq: () => getElement<HTMLButtonElement>('btn-read-seq'),
  btnReadRnd: () => getElement<HTMLButtonElement>('btn-read-rnd'),
  btnWrite: () => getElement<HTMLButtonElement>('btn-write'),
  btnExportJson: () => getElement<HTMLButtonElement>('btn-export-json'),
  btnExportCsv: () => getElement<HTMLButtonElement>('btn-export-csv'),
  btnClearResults: () => getElement<HTMLButtonElement>('btn-clear-results'),
};
