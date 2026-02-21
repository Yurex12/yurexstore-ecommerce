import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../api';

import toast from 'react-hot-toast';
import axios from 'axios';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: createOrderApi,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      queryClient.setQueryData(['cart'], (oldData) => {
        if (!oldData) return oldData;
        else return [];
      });
      return { previousCart };
    },

    onSuccess: () => toast.success('Order placed successfully'),

    onError: (error, _, context) => {
      let message = 'Failed to create order';

      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.message;

        if (status === 500) {
          message = 'Something went wrong';
        } else if (error.code === 'ERR_NETWORK') {
          message = 'Network error. Please check your connection.';
        } else {
          message = apiMessage || message;
        }
      }

      toast.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return { createOrder, isPending, error };
}
