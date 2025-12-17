import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteProducts as deleteProductsApi } from '../api';
import type { Product } from '../types';

export function useDeleteProducts() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProducts,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteProductsApi,

    onMutate: async (productIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const prevProducts = queryClient.getQueryData<Product[]>(['products']);

      queryClient.setQueryData<Product[]>(['products'], (products) => {
        if (!products) return products;
        return products.filter((product) => !productIds.includes(product.id));
      });

      return { prevProducts };
    },

    onSuccess: (data) => {
      toast.success(data?.message || 'Product deleted successfully');
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

  return { deleteProducts, isPending, error };
}
