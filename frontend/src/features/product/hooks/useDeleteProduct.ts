import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteProduct as deleteProductApi } from '../api';
import type { Product } from '../types';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteProductApi,

    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const prevProducts = queryClient.getQueryData<Product[]>(['products']);

      queryClient.setQueryData<Product[]>(['products'], (products) => {
        if (!products) return products;
        return products.filter((product) => product.id !== productId);
      });

      return { prevProducts };
    },

    onSuccess: () => {
      toast.success('Product deleted successfully');
    },

    onError: (error, _, context) => {
      if (context?.prevProducts) {
        queryClient.setQueryData(['products'], context.prevProducts);
      }
      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  return { deleteProduct, isPending, error };
}
