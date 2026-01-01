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
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  return { topProducts, isPending, error };
}
