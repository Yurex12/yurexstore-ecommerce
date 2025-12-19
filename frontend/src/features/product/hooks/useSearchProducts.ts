import { useQuery } from '@tanstack/react-query';
import { getSearchProducts } from '../api';

export function useSearchProducts(query: string) {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ['search-products', query],
    queryFn: () => getSearchProducts(query),
    enabled: !!query,
  });
  return { products, isPending, error };
}
