import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCategories as deleteCategoriesApi } from '../api';
import type { Category } from '../types';

export default function useDeleteCategories() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCategories,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteCategoriesApi,

    onMutate: async (categoryIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const prevCategories = queryClient.getQueryData<Category[]>([
        'categories',
      ]);

      queryClient.setQueryData<Category[]>(['categories'], (categories) => {
        if (!categories) return categories;
        return categories.filter(
          (category) => !categoryIds.includes(category.id)
        );
      });

      return { prevCategories };
    },

    onSuccess: (data) => {
      toast.success(data?.message || 'Category deleted successfully');
    },

    onError: (error, _, context) => {
      if (context?.prevCategories) {
        queryClient.setQueryData(['categories'], context.prevCategories);
      }
      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return { deleteCategories, isPending, error };
}
