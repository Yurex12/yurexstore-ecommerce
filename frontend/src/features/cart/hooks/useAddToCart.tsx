import { useMutation } from '@tanstack/react-query';
import { addToCart as addToCartApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useAddToCart() {
  const {
    mutate: addToCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToCartApi,
    onSuccess(data) {
      console.log(data);
      toast.success('Item Added to cart');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { addToCart, isPending, error };
}
