import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview as createReviewApi } from '../api';

import toast from 'react-hot-toast';

export function useCreateReview() {
  const queryClient = useQueryClient();
  const {
    mutate: createReview,
    isPending,
    error,
  } = useMutation({
    mutationFn: createReviewApi,
    onSuccess() {
      toast.success('Thanks for your feedback');
      queryClient.invalidateQueries({ queryKey: ['pending-reviews'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createReview, isPending, error };
}
