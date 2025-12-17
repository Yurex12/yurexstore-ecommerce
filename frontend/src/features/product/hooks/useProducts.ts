import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';

export function useProducts() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || undefined;
  const color = searchParams.get('color') || undefined;
  const gender = searchParams.get('gender')?.toUpperCase() || undefined;
  const sort = searchParams.get('sort') || undefined;
  const page = Number(searchParams.get('page') || 1);

  const { data, isPending, error } = useQuery({
    queryKey: ['products', category, color, gender, sort, page],
    queryFn: () => getProducts({ category, color, gender, sort, page }),
  });
  return {
    products: data?.products,
    totalPages: data?.totalPages ?? 0,
    totalProduct: data?.totalProducts ?? 0,
    page,
    isPending,
    error,
  };
}
