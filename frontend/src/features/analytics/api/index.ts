import { api, handleApiError } from '@/services/api';
import type { GetChartDataResponse, GetMetricsResponse } from '../types';

export async function getMetrics() {
  try {
    const { data } = await api.get<GetMetricsResponse>(
      `/admin/analytics/metrics`
    );

    return data.metrics;
  } catch (error) {
    handleApiError(error, 'Failed to fetch metrics');
  }
}

export async function getChartData() {
  try {
    const { data } = await api.get<GetChartDataResponse>(
      `/admin/analytics/chart`
    );

    return data.chartData;
  } catch (error) {
    handleApiError(error, 'Failed to fetch Chart data');
  }
}
