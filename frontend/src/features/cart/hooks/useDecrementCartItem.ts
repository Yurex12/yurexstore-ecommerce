import { useMutation, useQueryClient } from '@tanstack/react-query';
import { decrementCartItem as decrementCartItemApi } from '../api';
import { toast } from 'react-hot-toast';
import type { CartWithRelation } from '../types';

export function useDecrementCartItem() {
  const queryClient = useQueryClient();

  const {
    mutate: decrementCartItem,
    isPending,
    error,
  } = useMutation({
    mutationFn: decrementCartItemApi,

    onMutate: async (cartItemId: string) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const prevCart = queryClient.getQueryData<CartWithRelation[]>(['cart']);

      queryClient.setQueryData<CartWithRelation[]>(['cart'], (old) => {
        if (!old) return old;

        return old.reduce<CartWithRelation[]>((acc, item) => {
          if (item.id === cartItemId) {
            if (item.quantity > 1)
              acc.push({ ...item, quantity: item.quantity - 1 });
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      });

      return { prevCart };
    },

    onSuccess: () => {
      toast.success('Item quantity reduced');
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

  return { decrementCartItem, isPending, error };
}
