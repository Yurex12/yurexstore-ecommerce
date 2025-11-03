import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../api';

export default function useOrder(orderId: string) {
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });
  return { order, isPending, error };
}
