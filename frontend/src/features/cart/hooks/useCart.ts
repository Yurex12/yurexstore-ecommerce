import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api';

export function useCart() {
  const {
    data: cart,
    isPending,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });
  return { cart, isPending, error };
}
