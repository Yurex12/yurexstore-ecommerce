import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut as signOutApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useSignOut() {
  const queryClient = useQueryClient();
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: signOutApi,
    onSuccess() {
      queryClient.invalidateQueries();
      toast.success('Logout successful');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { signOut, isPending, error };
}
