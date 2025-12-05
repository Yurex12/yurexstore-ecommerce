import { useMutation } from '@tanstack/react-query';

import { createPaymentIntent as createPaymentIntentApi } from '@/services/payment';
import toast from 'react-hot-toast';

export default function useCreatePaymentIntent() {
  const {
    mutate: createPaymentIntent,
    isPending,
    error,
  } = useMutation({
    mutationFn: createPaymentIntentApi,
    onError(error) {
      toast.error(error.message);
    },
  });
  return { createPaymentIntent, isPending, error };
}
