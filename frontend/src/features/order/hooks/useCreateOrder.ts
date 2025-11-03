import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../api';

import toast from 'react-hot-toast';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess() {
      toast.success('Order placed successfully');
      queryClient.invalidateQueries({ queryKey: ['order', 'cart'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createOrder, isPending, error };
}
