import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '../api';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: signInUser,
    onSuccess(data) {
      queryClient.setQueryData(['user'], data);
      toast.success('Login successful');
      navigate('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { signIn, isPending, error };
}
