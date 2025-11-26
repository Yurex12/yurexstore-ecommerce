import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory as categoryApi } from '../api';

import toast from 'react-hot-toast';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const {
    mutate: createCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: categoryApi,
    onSuccess() {
      toast.success('Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createCategory, isPending, error };
}
