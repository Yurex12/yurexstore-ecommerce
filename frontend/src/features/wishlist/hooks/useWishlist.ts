import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../api';
import useUser from '@/features/auth/hooks/useUser';

export function useWishlist() {
  const { isAuthenticated } = useUser();
  const {
    data: wishlist,
    isPending,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });
  return { wishlist, isPending: isAuthenticated ? isPending : false, error };
}
