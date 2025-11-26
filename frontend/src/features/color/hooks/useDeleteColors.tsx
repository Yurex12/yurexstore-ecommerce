import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteColors as deleteColorsApi } from '../api';
import type { Color } from '../types';

export function useDeleteColors() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteColors,
    isPending,
    error,
  } = useMutation({
    mutationFn: (colorIds: string[]) => deleteColorsApi(colorIds),

    onMutate: async (colorIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ['colors'] });

      const prevColors = queryClient.getQueryData<Color[]>(['colors']);

      queryClient.setQueryData<Color[]>(['colors'], (colors) => {
        if (!colors) return colors;
        return colors.filter((color) => !colorIds.includes(color.id));
      });

      return { prevColors };
    },

    onSuccess: (data) => {
      toast.success(data?.message || 'Colors deleted successfully');
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

  return { deleteColors, isPending, error };
}
