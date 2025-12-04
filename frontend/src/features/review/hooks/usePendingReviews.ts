import { useQuery } from '@tanstack/react-query';
import { getPendingReviews } from '../api';

export function usePendingReviews() {
  const {
    data: pendingReviews,
    isPending,
    error,
  } = useQuery({
    queryKey: ['pending-reviews'],
    queryFn: getPendingReviews,
  });

  return { pendingReviews, isPending, error };
}
