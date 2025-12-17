import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../api';

export function useProduct(productId: string | undefined) {
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId,
  });
  return { product, isPending, error };
}
