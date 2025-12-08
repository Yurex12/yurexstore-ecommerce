import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { changeDefaultAddress } from '../api';

export function useChangeDefaultAddress() {
  const queryClient = useQueryClient();
  const {
    mutate: setDefaultAddress,
    isPending,
    error,
  } = useMutation({
    mutationFn: changeDefaultAddress,

    onSuccess() {
      toast.success('Default address changed successfully');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },

    onError(error) {
      toast.error(error.message);
    },
  });
  return { setDefaultAddress, isPending, error };
}
