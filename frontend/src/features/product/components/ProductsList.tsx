import { Spinner } from '@/components/ui/spinner';

import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';

export default function ProductsList() {
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
    <div className='mt-3 grid grid-cols-2 items-center justify-around gap-1 sm:gap-2 md:grid lg:grid-cols-3 '>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
