import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAddress as updateAddressApi } from '../api';

import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useUpdateAddress() {
  const { id: addressId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: updateAddress,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateAddressApi,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['address', addressId],
      });
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
      toast.success('Address updated successfully');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { updateAddress, isPending, error };
}
