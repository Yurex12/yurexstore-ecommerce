import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api';

export default function useOrders() {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  return { orders, isPending, error };
}
