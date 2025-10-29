import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../api';

export default function useWishlist() {
  const {
    data: wishlist,
    isPending,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });
  return { wishlist, isPending, error };
}
