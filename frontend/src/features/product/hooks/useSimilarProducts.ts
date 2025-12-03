import { useQuery } from '@tanstack/react-query';
import { getSimilarProducts } from '../api';
import type { SimilarProductsQuery } from '../types';

export function useSimilarProducts(productQuery: SimilarProductsQuery) {
  const {
    data: similarProducts,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getSimilarProducts(productQuery),
    queryKey: [
      'similar-products',
      productQuery.productId,
      productQuery.categoryId,
    ],
  });

  return { similarProducts, isPending, error };
}
