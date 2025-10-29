import { useMutation } from '@tanstack/react-query';
import { updatePassword as updatePasswordApi } from '../api';

import { toast } from 'react-hot-toast';

export default function useUpdatePassword() {
  const {
    mutate: updatePassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess() {
      toast.success('Password updated successfully.');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { updatePassword, isPending, error };
}
