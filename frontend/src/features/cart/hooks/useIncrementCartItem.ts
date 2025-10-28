import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incrementCartItem as incrementCartItemApi } from '../api';

import { toast } from 'react-hot-toast';
import type { CartWithRelation } from '../types';

export default function useIncrementCartItem() {
  const queryClient = useQueryClient();
  const {
    mutate: incrementCartItem,
    isPending,
    error,
  } = useMutation({
    mutationFn: incrementCartItemApi,

    onMutate: async (cartItemId) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      const prevCart = queryClient.getQueryData<CartWithRelation[]>(['cart']);

      queryClient.setQueryData<CartWithRelation[]>(['cart'], (old) => {
        if (!old) return old;

        return old.map<CartWithRelation>((item) => {
          if (item.id !== cartItemId) return item;
          return { ...item, quantity: item.quantity + 1 };
        });
      });

      return { prevCart };
    },

    onSuccess: () => {
      toast.success('Item quantity increased');
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
  return { incrementCartItem, isPending, error };
}
