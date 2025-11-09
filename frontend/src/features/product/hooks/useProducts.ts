import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';

export function useProducts() {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  return { products, isPending, error };
}
