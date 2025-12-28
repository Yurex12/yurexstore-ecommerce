import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api';
import useUser from '@/features/auth/hooks/useUser';

export function useCart() {
  const { isAuthenticated } = useUser();
  const {
    data: cart,
    isPending,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
  });
  return { cart, isPending: isAuthenticated ? isPending : false, error };
}
