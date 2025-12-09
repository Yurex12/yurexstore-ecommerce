import { useQuery } from '@tanstack/react-query';
import { getAddress } from '../api';

export function useAddress(addressId: string | undefined) {
  const {
    data: address,
    isPending,
    error,
    isEnabled,
  } = useQuery({
    queryKey: ['address', addressId],
    queryFn: () => getAddress(addressId!),
    enabled: !!addressId,
  });
  return { address, isPending, isEnabled, error };
}
