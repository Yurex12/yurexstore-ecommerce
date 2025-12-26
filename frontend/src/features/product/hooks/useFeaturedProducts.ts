import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '../api';

export function useFeaturedProducts() {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => getFeaturedProducts(),
    staleTime: 60000,
  });

  return {
    products,
    isPending,
    error,
  };
}
