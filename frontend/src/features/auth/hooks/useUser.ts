import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api';

export default function useUser() {
  const hasToken = !!localStorage.getItem('isLoggedIn');

  const {
    data: user,
    isPending: queryIsPending,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    enabled: hasToken,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (count, err: Error) => {
      if (err.message === 'Your session has expired. Please log in again.')
        return false;
      return count < 2;
    },
  });

  const isPending = hasToken ? queryIsPending : false;

  return {
    user,
    isPending,
    error,
    isAuthenticated: !!user,
  };
}
