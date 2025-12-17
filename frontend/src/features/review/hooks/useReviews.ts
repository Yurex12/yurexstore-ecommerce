import { useQuery } from '@tanstack/react-query';
import { getProductReviews } from '../api';

export function useReviews(productId: string) {
  console.log(productId);

  const {
    data: reviews,
    isPending,
    error,
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
  return { reviews, isPending, error };
}
