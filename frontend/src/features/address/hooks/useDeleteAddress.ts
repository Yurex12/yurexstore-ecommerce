import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteAddress as deleteAddressApi } from '../api';
import type { Address } from '../types';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAddress,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteAddressApi,

    onMutate: async (addressId: string) => {
      await queryClient.cancelQueries({ queryKey: ['addresses'] });

      const prevAddresses = queryClient.getQueryData<Address[]>(['addresses']);

      queryClient.setQueryData<Address[]>(['addresses'], (addresses) => {
        if (!addresses) return addresses;
        return addresses.filter((address) => address.id !== addressId);
      });

      return { prevAddresses };
    },

    onSuccess: () => {
      toast.success('Address deleted successfully');
    },

    onError: (error, _, context) => {
      if (context?.prevAddresses) {
        queryClient.setQueryData(['addresses'], context.prevAddresses);
      }
      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  return { deleteAddress, isPending, error };
}
