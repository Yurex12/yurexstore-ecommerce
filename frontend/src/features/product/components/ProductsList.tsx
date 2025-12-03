import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import ProductCard from './ProductCard';
import ProductListSkeleton from './ProductListSkeleton';

import { useProducts } from '../hooks/useProducts';

export default function ProductsList() {
  const { products, isPending, error } = useProducts();

  if (isPending) {
    return <ProductListSkeleton />;
  }

  if (error) {
    return <InlineError message='unable to load products.' />;
  }

  if (!products?.length) {
    return <EmptyState message='No products found.' />;
  }

  return (
    <div className='mt-3 grid grid-cols-2 items-center justify-around gap-1 sm:gap-2 md:grid lg:grid-cols-3 '>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
