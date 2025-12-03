import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle as loginWithGoogleApi } from '../api';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useGoogleLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: loginWithGoogle,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginWithGoogleApi,
    onSuccess(data) {
      queryClient.setQueryData(['user'], data);
      toast.success('Login successful');
      navigate('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { loginWithGoogle, isPending, error };
}
