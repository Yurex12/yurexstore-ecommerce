import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '../api';

export default function useAddresses() {
  const {
    data: addresses,
    isPending,
    error,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
  return { addresses, isPending, error };
}
