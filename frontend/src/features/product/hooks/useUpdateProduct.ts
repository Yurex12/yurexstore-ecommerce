import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProduct as updateProductApi } from '../api';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateProductApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateProduct, isPending, error };
}
