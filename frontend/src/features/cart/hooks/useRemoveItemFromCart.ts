import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeItemFromCart as removeFromCartApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useRemoveItemFromCart() {
  const queryClient = useQueryClient();
  const {
    mutate: removeFromCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item remove from cart');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { removeFromCart, isPending, error };
}
