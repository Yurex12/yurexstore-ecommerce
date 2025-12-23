import { api, handleApiError } from '@/services/api';
import type {
  GetChartDataResponse,
  GetMetricsResponse,
  GetTopProductsResponse,
} from '../types';

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
export async function getTopProducts() {
  try {
    const { data } = await api.get<GetTopProductsResponse>(
      `/admin/analytics/top-products`
    );

    return data.topProducts;
  } catch (error) {
    handleApiError(error, 'Failed to fetch top products');
  }
}
