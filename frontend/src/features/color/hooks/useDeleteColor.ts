import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteColor as deleteColorApi } from '../api';
import type { Color } from '../types';

export function useDeleteColor() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteColor,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteColorApi,

    onMutate: async (colorId: string) => {
      await queryClient.cancelQueries({ queryKey: ['colors'] });

      const prevColors = queryClient.getQueryData<Color[]>(['colors']);

      queryClient.setQueryData<Color[]>(['colors'], (colors) => {
        if (!colors) return colors;
        return colors.filter((color) => color.id !== colorId);
      });

      return { prevColors };
    },

    onSuccess: () => {
      toast.success('Color deleted successfully');
    },

    onError: (error, _, context) => {
      if (context?.prevColors) {
        queryClient.setQueryData(['colors'], context.prevColors);
      }
      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });

  return { deleteColor, isPending, error };
}
