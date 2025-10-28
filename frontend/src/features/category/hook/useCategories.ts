import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api';

export default function useCategories() {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return { categories, isPending, error };
}
