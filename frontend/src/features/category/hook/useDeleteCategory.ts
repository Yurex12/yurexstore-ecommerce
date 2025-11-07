import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCategory as deleteCategoryApi } from '../api';
import type { Category } from '../types';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteCategoryApi,

    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const prevCategories = queryClient.getQueryData<Category[]>([
        'categories',
      ]);

      queryClient.setQueryData<Category[]>(['categories'], (categories) => {
        if (!categories) return categories;
        return categories.filter((category) => category.id !== categoryId);
      });

      return { prevCategories };
    },

    onSuccess: () => {
      toast.success('Category deleted successfully');
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

  return { deleteCategory, isPending, error };
}
