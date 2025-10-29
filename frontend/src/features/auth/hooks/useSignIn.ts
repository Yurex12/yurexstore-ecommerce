import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '../api';

import { toast } from 'react-hot-toast';

export default function useSignIn() {
  const queryClient = useQueryClient();
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: signInUser,
    onSuccess(data) {
      queryClient.setQueryData(['user'], data);
      toast.success('Login successful');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { signIn, isPending, error };
}
