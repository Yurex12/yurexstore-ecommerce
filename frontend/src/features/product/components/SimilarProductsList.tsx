import { Spinner } from '@/components/ui/spinner';
import InlineError from '@/components/InlineError';
import ProductCard from './ProductCard';

import { useSimilarProducts } from '../hooks/useSimilarProducts';
import type { SimilarProductsQuery } from '../types';

export default function SimilarProductsList({
  categoryId,
  productId,
}: SimilarProductsQuery) {
  const { similarProducts, isPending, error } = useSimilarProducts({
    categoryId,
    productId,
  });

  if (isPending)
    return (
      <div className='flex items-center gap-x-2 mt-2'>
        <Spinner />
        <span className='text-muted-foreground'> Loading.. </span>
      </div>
    );
  if (error) return <InlineError message='Failed to load similar products.' />;
  if (!similarProducts?.length)
    return <p className='text-muted-foreground mt-2'>Nothing to see here</p>;

  return (
    <div className='mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 '>
      {similarProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
