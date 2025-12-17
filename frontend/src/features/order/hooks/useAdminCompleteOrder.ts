import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { completeOrder as completeOrderApi } from '../api';

export default function useAdminCompleteOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: completeOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: completeOrderApi,
    onSuccess(data) {
      toast.success('Order marked as completed');
      queryClient.invalidateQueries({
        queryKey: ['admin-orders', data?.orderId],
      });

      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { completeOrder, isPending, error };
}
