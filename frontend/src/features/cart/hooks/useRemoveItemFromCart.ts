import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeItemFromCart as removeFromCartApi } from '../api';

import { toast } from 'react-hot-toast';
import type { CartWithRelation } from '../types';

export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();
  const {
    mutate: removeFromCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: removeFromCartApi,

    onMutate: async (cartItemId) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      const prevCartItems = queryClient.getQueryData<CartWithRelation>([
        'cart',
      ]);

      queryClient.setQueryData<CartWithRelation[]>(['cart'], (cartItems) => {
        if (!cartItems) return cartItems;

        return cartItems.filter((cartItem) => cartItem.id !== cartItemId);
      });

      return { prevCartItems };
    },
    onSuccess: () => {
      toast.success('Item removed from cart successfully');
    },
    onError: (error, _, context) => {
      if (context?.prevCartItems) {
        queryClient.setQueryData(['cart'], context.prevCartItems);
      }
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return { removeFromCart, isPending, error };
}
