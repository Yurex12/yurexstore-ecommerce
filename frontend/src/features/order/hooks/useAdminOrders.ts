import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '../api';

export default function useAdminOrders() {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: getAdminOrders,
  });
  return { orders, isPending, error };
}
