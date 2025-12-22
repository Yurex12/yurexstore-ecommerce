import { api, handleApiError } from '@/services/api';
import type { GetMetricsResponse } from '../types';

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
