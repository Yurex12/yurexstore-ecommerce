import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAddress as createAddressApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useCreateAddress() {
  const queryClient = useQueryClient();
  const {
    mutate: createAddress,
    isPending,
    error,
  } = useMutation({
    mutationFn: createAddressApi,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address created successfully');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createAddress, isPending, error };
}
