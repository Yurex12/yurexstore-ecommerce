import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColor as createColorApi } from '../api';

import toast from 'react-hot-toast';

export function useCreateColor() {
  const queryClient = useQueryClient();
  const {
    mutate: createColor,
    isPending,
    error,
  } = useMutation({
    mutationFn: createColorApi,
    onSuccess() {
      toast.success('Color created successfully');
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createColor, isPending, error };
}
