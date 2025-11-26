import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { cancelOrder as cancelOrderAPi } from '../api';

export default function useAdminCancelOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: cancelOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: cancelOrderAPi,
    onSuccess(data) {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ['admin-orders', data?.orderId],
      });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order cancelled');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { cancelOrder, isPending, error };
}
