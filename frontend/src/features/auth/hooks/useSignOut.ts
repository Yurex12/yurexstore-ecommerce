import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut as signOutApi } from '../api';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: signOutApi,
    onSuccess() {
      queryClient.clear();
      toast.success('Logout successful');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { signOut, isPending, error };
}
