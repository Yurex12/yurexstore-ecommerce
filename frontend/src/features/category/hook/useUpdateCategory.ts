import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCategory as updateCategoryApi } from '../api';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCategoryApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateCategory, isPending, error };
}
