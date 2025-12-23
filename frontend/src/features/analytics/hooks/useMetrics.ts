import { useQuery } from '@tanstack/react-query';
import { getMetrics } from '../api';

export function useMetrics() {
  const {
    data: metrics,
    isPending,
    error,
  } = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics,
    refetchInterval: 5 * 1000,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  return { metrics, isPending, error };
}
