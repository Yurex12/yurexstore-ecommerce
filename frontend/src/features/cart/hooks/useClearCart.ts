import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearCart as clearCartApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useClearCart() {
  const queryClient = useQueryClient();
  const {
    mutate: clearCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: clearCartApi,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart cleared successfully');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { clearCart, isPending, error };
}
