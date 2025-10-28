import { useMutation, useQueryClient } from '@tanstack/react-query';
import { decrementCartItem as decrementCartItemApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useDecrementCartItem() {
  const queryClient = useQueryClient();
  const {
    mutate: decrementCartItem,
    isPending,
    error,
  } = useMutation({
    mutationFn: decrementCartItemApi,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item quantity reduced in cart');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { decrementCartItem, isPending, error };
}
