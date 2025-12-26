import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';

import ProductPreviewCard from './ProductPreviewCard';

import { useFeaturedProducts } from '../hooks/useFeaturedProducts';
import ProductsPreviewSkeleton from './ProductsPreviewSkeleton';

export default function ProductsPreviewList() {
  const { products, error, isPending } = useFeaturedProducts();

  if (isPending) return <ProductsPreviewSkeleton />;

  if (error) return <ErrorState message='Unable to load products' />;

  if (!products?.length) return <EmptyState message='No products found' />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2  lg:grid-cols-4'>
      {products.map((product) => (
        <ProductPreviewCard key={product.id} {...product} />
      ))}
    </div>
  );
}
