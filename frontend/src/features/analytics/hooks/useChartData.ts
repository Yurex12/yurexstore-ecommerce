import { useQuery } from '@tanstack/react-query';
import { getChartData } from '../api';

export function useChartData() {
  const {
    data: chartData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['chartData'],
    queryFn: getChartData,
  });
  return { chartData, isPending, error };
}
