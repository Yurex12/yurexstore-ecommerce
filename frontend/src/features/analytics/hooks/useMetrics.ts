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
  });
  return { metrics, isPending, error };
}
