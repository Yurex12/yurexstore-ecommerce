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
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
  return { chartData, isPending, error };
}
