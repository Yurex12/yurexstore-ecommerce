import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateColor as updateColorApi } from '../api';

export function useUpdateColor() {
  const queryClient = useQueryClient();

  const {
    mutate: updateColor,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateColorApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
      toast.success('Color updated successfully');
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateColor, isPending, error };
}
