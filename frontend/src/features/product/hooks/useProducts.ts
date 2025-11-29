import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';

export function useProducts() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || undefined;
  const color = searchParams.get('color') || undefined;
  const gender = searchParams.get('gender')?.toUpperCase() || undefined;
  const sort = searchParams.get('sort') || undefined;

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ['products', category, color, gender, sort],
    queryFn: () => getProducts({ category, color, gender, sort }),
  });
  return { products, isPending, error };
}
