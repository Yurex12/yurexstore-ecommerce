import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToWishlist as addToWishlistApi } from '../api';

import toast from 'react-hot-toast';

export default function useAddToWishlist() {
  const queryClient = useQueryClient();
  const {
    mutate: addToWishlist,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToWishlistApi,

    onSuccess() {
      toast.success('Item added to wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { addToWishlist, isPending, error };
}
