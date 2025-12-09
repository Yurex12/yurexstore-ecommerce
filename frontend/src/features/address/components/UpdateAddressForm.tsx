import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAddress as updateAddressApi } from '../api';

import { toast } from 'react-hot-toast';

export function useUpdateAddress(addressId: string) {
  const queryClient = useQueryClient();
  const {
    mutate: updateAddress,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => updateAddressApi(addressId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['addresses', addressId] });
      toast.success('Address updated successfully');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { updateAddress, isPending, error };
}
