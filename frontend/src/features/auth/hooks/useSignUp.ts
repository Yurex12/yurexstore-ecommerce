import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpApi } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess(data) {
      queryClient.setQueryData(['user'], data?.user);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success(data?.message || 'Registration successful');
      navigate('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { signUp, isPending, error };
}
