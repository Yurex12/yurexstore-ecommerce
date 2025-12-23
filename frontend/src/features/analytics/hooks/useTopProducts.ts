import { useQuery } from '@tanstack/react-query';
import { getTopProducts } from '../api';

export function useTopProducts() {
  const {
    data: topProducts,
    isPending,
    error,
  } = useQuery({
    queryKey: ['top-products'],
    queryFn: getTopProducts,
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
  return { topProducts, isPending, error };
}
