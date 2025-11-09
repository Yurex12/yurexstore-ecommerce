import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import { useProducts } from '../hooks/useProducts';
import ProductPreviewCard from './ProductPreviewCard';
import ProductPreviewSkeletonGrid from './ProductPreviewSkeletonGrid';

export default function ProductsPreviewList() {
  const { products, isPending, error } = useProducts();

  if (isPending) return <ProductPreviewSkeletonGrid />;

  if (error) return <InlineError message='Unable to load products' />;

  if (!products?.length) return <EmptyState message='No products found' />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2  lg:grid-cols-4'>
      {products.map((product) => (
        <ProductPreviewCard key={product.id} {...product} />
      ))}
    </div>
  );
}
