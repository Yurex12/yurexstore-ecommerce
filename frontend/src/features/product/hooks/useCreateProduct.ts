import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct as createProductApi } from '../api';

import toast from 'react-hot-toast';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: createProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: createProductApi,
    onSuccess() {
      toast.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createProduct, isPending, error };
}
