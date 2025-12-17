import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { clearCart as clearCartApi } from '../api';

import type { CartWithRelation } from '../types';

export function useClearCart() {
  const queryClient = useQueryClient();
  const {
    mutate: clearCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: clearCartApi,

    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });

      const prevCart = queryClient.getQueryData<CartWithRelation[]>(['cart']);

      queryClient.setQueryData<CartWithRelation[]>(['cart'], (cart) => {
        if (!cart) return cart;
        return [];
      });

      return { prevCart };
    },

    onSuccess: () => {
      toast.success('Cart cleared successfully.');
    },
    onError: (error, _, context) => {
      if (context?.prevCart) {
        queryClient.setQueryData(['cart'], context.prevCart);
      }
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return { clearCart, isPending, error };
}
