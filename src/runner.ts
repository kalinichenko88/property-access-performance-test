import { elements } from './elements';
import type { Data, DataCount, Scenario } from './models';

export type TestResult = {
  scenario: string;
  dataset: DataCount;
  operation: string;
  duration: number;
  timestamp: number;
  iterations?: number;
};

export type TestConfig = {
  iterations?: number;
  warmupRuns?: number;
  timeout?: number;
};

export class PerformanceRunner {
  private results: TestResult[] = [];
  private isRunning = false;

  private config: TestConfig;

  constructor(config: TestConfig = {}) {
    this.config = {
      iterations: 1,
      warmupRuns: 1,
      timeout: 30000,
      ...config,
    };
  }

  async runTest(
    scenario: Scenario,
    data: Data[],
    scenarioName: string,
    datasetSize: DataCount,
    operation: string,
  ): Promise<TestResult> {
    if (this.isRunning) {
      throw new Error('Test is already running');
    }

    this.isRunning = true;
    this.updateUI('Running test...', true);

    try {
      if (!this.config.warmupRuns) {
        throw new Error('Warmup runs are required');
      }

      // Warmup runs
      for (let i = 0; i < this.config.warmupRuns; i++) {
        scenario(data);
      }

      // Actual test runs
      const durations: number[] = [];

      if (!this.config.iterations) {
        throw new Error('Iterations are required');
      }

      for (let i = 0; i < this.config.iterations; i++) {
        const start = performance.now();
        scenario(data);
        const end = performance.now();
        durations.push(end - start);

        this.updateUI(`Run ${i + 1}/${this.config.iterations} completed`, false);
      }

      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const minDuration = Math.min(...durations);
      const maxDuration = Math.max(...durations);

      const result: TestResult = {
        scenario: scenarioName,
        dataset: datasetSize,
        operation,
        duration: avgDuration,
        timestamp: Date.now(),
        iterations: this.config.iterations,
      };

      this.results.push(result);
      this.logResult(result, { minDuration, maxDuration, durations });

      return result;
    } finally {
      this.isRunning = false;
      this.updateUI('Test completed', false);
    }
  }

  async runBatchTests(
    scenarios: Record<string, Scenario>,
    datasets: Record<DataCount, Data[]>,
    operations: string[],
  ): Promise<TestResult[]> {
    const results: TestResult[] = [];

    for (const [scenarioName, scenario] of Object.entries(scenarios)) {
      for (const [datasetSize, data] of Object.entries(datasets)) {
        for (const operation of operations) {
          try {
            const result = await this.runTest(
              scenario,
              data,
              scenarioName,
              parseInt(datasetSize) as DataCount,
              operation,
            );
            results.push(result);
          } catch (error) {
            console.error(`Error running test: ${scenarioName} ${datasetSize} ${operation}`, error);
          }
        }
      }
    }

    return results;
  }

  private updateUI(message: string, isLoading: boolean): void {
    const loadingText = elements.loadingText();
    if (loadingText) {
      loadingText.textContent = message;
    }

    const loading = elements.loading();
    if (isLoading) {
      loading.classList.remove('hidden');
    } else {
      loading.classList.add('hidden');
    }
  }

  private logResult(
    result: TestResult,
    stats: { minDuration: number; maxDuration: number; durations: number[] },
  ): void {
    const log = elements.log();
    const logEntry = `
${result.scenario} - ${result.dataset} records - ${result.operation}
  Average: ${result.duration.toFixed(2)}ms
  Min: ${stats.minDuration.toFixed(2)}ms
  Max: ${stats.maxDuration.toFixed(2)}ms
  Runs: ${result.iterations}
  Timestamp: ${new Date(result.timestamp).toLocaleTimeString()}
${'-'.repeat(50)}
`;

    log.textContent += logEntry;
    log.scrollTop = log.scrollHeight;
  }

  getResults(): TestResult[] {
    return [...this.results];
  }

  clearResults(): void {
    this.results = [];
    elements.log().textContent = '';
  }

  exportResults(): string {
    return JSON.stringify(this.results, null, 2);
  }

  isTestRunning(): boolean {
    return this.isRunning;
  }
}

export const createRunner = (config?: TestConfig): PerformanceRunner => {
  return new PerformanceRunner(config);
};
