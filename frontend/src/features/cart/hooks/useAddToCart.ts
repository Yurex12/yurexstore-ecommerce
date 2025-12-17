import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart as addToCartApi } from '../api';

import { toast } from 'react-hot-toast';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const {
    mutate: addToCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToCartApi,
    onSuccess() {
      toast.success('Item Added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { addToCart, isPending, error };
}
