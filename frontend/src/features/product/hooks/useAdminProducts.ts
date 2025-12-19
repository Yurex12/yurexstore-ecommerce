import { useQuery } from '@tanstack/react-query';
import { getAdminProducts } from '../api';

export function useAdminProducts() {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ['admin-products'],
    queryFn: getAdminProducts,
  });
  return { products, isPending, error };
}
