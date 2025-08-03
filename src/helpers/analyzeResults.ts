import type { TestResult } from '../runner';

export interface AnalysisResult {
  summary: {
    totalTests: number;
    averageDuration: number;
    fastestScenario: string;
    slowestScenario: string;
  };
  byScenario: Record<
    string,
    {
      count: number;
      averageDuration: number;
      minDuration: number;
      maxDuration: number;
    }
  >;
  byDataset: Record<
    number,
    {
      count: number;
      averageDuration: number;
    }
  >;
  byOperation: Record<
    string,
    {
      count: number;
      averageDuration: number;
    }
  >;
}

export const analyzeResults = (results: TestResult[]): AnalysisResult => {
  if (results.length === 0) {
    return {
      summary: {
        totalTests: 0,
        averageDuration: 0,
        fastestScenario: '',
        slowestScenario: '',
      },
      byScenario: {},
      byDataset: {},
      byOperation: {},
    };
  }

  const totalDuration = results.reduce((sum, result) => sum + result.duration, 0);
  const averageDuration = totalDuration / results.length;

  const fastestResult = results.reduce((min, result) => (result.duration < min.duration ? result : min));
  const slowestResult = results.reduce((max, result) => (result.duration > max.duration ? result : max));

  // Group by scenario
  const byScenario: Record<string, { count: number; durations: number[] }> = {};
  results.forEach((result) => {
    if (!byScenario[result.scenario]) {
      byScenario[result.scenario] = { count: 0, durations: [] };
    }
    byScenario[result.scenario].count++;
    byScenario[result.scenario].durations.push(result.duration);
  });

  // Group by dataset
  const byDataset: Record<number, { count: number; durations: number[] }> = {};
  results.forEach((result) => {
    if (!byDataset[result.dataset]) {
      byDataset[result.dataset] = { count: 0, durations: [] };
    }
    byDataset[result.dataset].count++;
    byDataset[result.dataset].durations.push(result.duration);
  });

  // Group by operation
  const byOperation: Record<string, { count: number; durations: number[] }> = {};
  results.forEach((result) => {
    if (!byOperation[result.operation]) {
      byOperation[result.operation] = { count: 0, durations: [] };
    }
    byOperation[result.operation].count++;
    byOperation[result.operation].durations.push(result.duration);
  });

  return {
    summary: {
      totalTests: results.length,
      averageDuration,
      fastestScenario: fastestResult.scenario,
      slowestScenario: slowestResult.scenario,
    },
    byScenario: Object.fromEntries(
      Object.entries(byScenario).map(([scenario, data]) => [
        scenario,
        {
          count: data.count,
          averageDuration: data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
          minDuration: Math.min(...data.durations),
          maxDuration: Math.max(...data.durations),
        },
      ]),
    ),
    byDataset: Object.fromEntries(
      Object.entries(byDataset).map(([dataset, data]) => [
        dataset,
        {
          count: data.count,
          averageDuration: data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
        },
      ]),
    ),
    byOperation: Object.fromEntries(
      Object.entries(byOperation).map(([operation, data]) => [
        operation,
        {
          count: data.count,
          averageDuration: data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
        },
      ]),
    ),
  };
};

export const generateReport = (results: TestResult[]): string => {
  const analysis = analyzeResults(results);

  let report = `Performance Test Report
=====================
Generated: ${new Date().toLocaleString()}

Summary:
- Total Tests: ${analysis.summary.totalTests}
- Average Duration: ${analysis.summary.averageDuration.toFixed(2)}ms
- Fastest Scenario: ${analysis.summary.fastestScenario}
- Slowest Scenario: ${analysis.summary.slowestScenario}

By Scenario:
`;

  Object.entries(analysis.byScenario).forEach(([scenario, data]) => {
    report += `- ${scenario}: ${data.averageDuration.toFixed(2)}ms (${data.count} tests, min: ${data.minDuration.toFixed(2)}ms, max: ${data.maxDuration.toFixed(2)}ms)\n`;
  });

  report += `\nBy Dataset:\n`;
  Object.entries(analysis.byDataset).forEach(([dataset, data]) => {
    report += `- ${dataset} records: ${data.averageDuration.toFixed(2)}ms (${data.count} tests)\n`;
  });

  report += `\nBy Operation:\n`;
  Object.entries(analysis.byOperation).forEach(([operation, data]) => {
    report += `- ${operation}: ${data.averageDuration.toFixed(2)}ms (${data.count} tests)\n`;
  });

  return report;
};

export const exportToCSV = (results: TestResult[]): string => {
  const headers = ['scenario', 'dataset', 'operation', 'duration', 'timestamp', 'iterations'];
  const csvRows = [headers.join(',')];

  results.forEach((result) => {
    const row = [
      result.scenario,
      result.dataset,
      result.operation,
      result.duration,
      result.timestamp,
      result.iterations || 1,
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
};
