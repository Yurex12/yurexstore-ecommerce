import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api';

export default function useUser() {
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
  return { user, isPending, error };
}
