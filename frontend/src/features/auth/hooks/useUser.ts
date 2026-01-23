import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api';

export default function useUser() {
  const hasSessionHint = !!localStorage.getItem('isLoggedIn');

  const {
    data: user,
    isPending: queryIsPending,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    enabled: hasSessionHint,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (count, err: Error) => {
      if (err.message === 'Your session has expired. Please log in again.')
        return false;
      return count < 2;
    },
  });

  const isPending = hasSessionHint ? queryIsPending : false;

  return {
    user,
    isPending,
    error,
    isAuthenticated: !!user,
  };
}
