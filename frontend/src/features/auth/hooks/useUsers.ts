import { useQuery } from '@tanstack/react-query';
import { getUsersData } from '../api';

export default function useUsers() {
  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryKey: ['admin-user'],
    queryFn: getUsersData,
  });
  return { users, isPending, error };
}
