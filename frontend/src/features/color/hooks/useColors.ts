import { useQuery } from '@tanstack/react-query';
import { getColors } from '../api';

export function useColors() {
  const {
    data: colors,
    isPending,
    error,
  } = useQuery({
    queryKey: ['colors'],
    queryFn: getColors,
  });
  return { colors, isPending, error };
}
