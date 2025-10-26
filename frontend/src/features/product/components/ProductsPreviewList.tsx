import { Spinner } from '@/components/ui/spinner';

import useProducts from '../hooks/useProducts';
import ProductPreviewCard from './ProductPreviewCard';

export default function ProductsPreviewList() {
  const { products, isPending, error } = useProducts();

  if (isPending) {
    return (
      <div className='flex items-center gap-4'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!products?.length) {
    return <p>No products found</p>;
  }
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2  lg:grid-cols-4'>
      {products.map((product) => (
        <ProductPreviewCard key={product.id} {...product} />
      ))}
    </div>
  );
}
