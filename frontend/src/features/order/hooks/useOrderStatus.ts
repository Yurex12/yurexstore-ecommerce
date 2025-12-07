import { useQuery } from '@tanstack/react-query';

import { getOrderStatus } from '../api';

export function useOrderStatus(paymentId: string | null) {
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ['order-processing', paymentId],
    queryFn: () => getOrderStatus(paymentId!),
    enabled: !!paymentId,
    refetchInterval: 5000,
  });
  return { order, isPending, error };
}
