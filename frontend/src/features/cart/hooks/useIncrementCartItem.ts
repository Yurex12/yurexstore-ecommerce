import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incrementCartItem as incrementCartItemApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useIncrementCartItem() {
  const queryClient = useQueryClient();
  const {
    mutate: incrementCartItem,
    isPending,
    error,
  } = useMutation({
    mutationFn: incrementCartItemApi,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item quantity reduced in cart');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { incrementCartItem, isPending, error };
}
