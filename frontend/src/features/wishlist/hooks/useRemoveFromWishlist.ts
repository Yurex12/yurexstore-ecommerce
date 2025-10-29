import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromWishlist as removeFromWishlistApi } from '../api';
import type { WishlistItem } from '../types';
import toast from 'react-hot-toast';

export default function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const {
    mutate: removeFromWishlist,
    isPending,
    error,
  } = useMutation({
    mutationFn: removeFromWishlistApi,

    onMutate: async (wishlistItemId) => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });

      const prevWishlist = queryClient.getQueryData(['wishlist']);

      queryClient.setQueryData<WishlistItem[]>(['wishlist'], (wishlist) => {
        if (!wishlist) return wishlist;

        return wishlist.filter(
          (wishlistItem) => wishlistItem.id !== wishlistItemId
        );
      });

      return { prevWishlist };
    },
    onSuccess: () => {
      toast.success('Product removed from wishlist');
    },
    onError: (error, _, context) => {
      if (context?.prevWishlist) {
        queryClient.setQueryData(['wishlist'], context.prevWishlist);
      }

      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
  return { removeFromWishlist, isPending, error };
}
