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
    onSuccess: async () => {
      queryClient.setQueryData(['cart'], []);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['cart'] }),
        queryClient.invalidateQueries({ queryKey: ['order'] }),
      ]);

      toast.success('Order placed successfully');
    },
    onError: (error) => {
      let message = 'Failed to create order';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.message;

        if (status === 409 || status === 404) {
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        }

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
  });

  return { createOrder, isPending, error };
}
