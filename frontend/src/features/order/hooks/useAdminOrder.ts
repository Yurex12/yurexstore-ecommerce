import { useQuery } from '@tanstack/react-query';
import { getAdminOrder } from '../api';

export default function useAdminOrder(orderId: string | undefined) {
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ['admin-orders', orderId],
    queryFn: () => getAdminOrder(orderId!),
    enabled: !!orderId,
  });
  return { order, isPending, error };
}
