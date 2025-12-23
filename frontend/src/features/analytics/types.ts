import type { ApiResponseBase } from '@/services/types';

export type MetricPeriodValue = {
  last7Days: number;
  last14Days: number;
};

export type GetMetricsResponse = ApiResponseBase & {
  metrics: {
    orders: MetricPeriodValue;
    revenue: MetricPeriodValue;
    averageOrderValue: MetricPeriodValue;
  };
};
export type GetChartDataResponse = ApiResponseBase & {
  chartData: {
    date: string;
    revenue: number;
    orders: number;
  }[];
};
