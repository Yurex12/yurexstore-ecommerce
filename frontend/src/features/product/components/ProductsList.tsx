import InlineError from '@/components/ErrorState';
import PaginationControls from '@/components/Pagination';
import ProductCard from './ProductCard';

import ProductListSkeleton from './ProductListSkeleton';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export default function ProductsList() {
  const [_, setSearchParams] = useSearchParams();
  const { products, isPending, error, page, totalPages } = useProducts();

  const resetAllParams = () => setSearchParams(new URLSearchParams());

  if (isPending) return <ProductListSkeleton />;

  if (error)
    return (
      <InlineError
        message='unable to load products.'
        className='h-[80svh] border-0 md:h-auto md:border'
      />
    );

  if (!products?.length) {
    return (
      <div className='h-[75svh] md:border mt-4 rounded-sm gap-2 flex items-center justify-center flex-col'>
        <div className={'flex text-center gap-2'}>
          <AlertCircle className='size-4 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>No products found</p>
        </div>

        <Button variant='secondary' onClick={resetAllParams}>
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='mt-3 grid grid-cols-2 gap-1 sm:gap-2 md:grid lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className='w-full flex justify-center md:justify-end md:mt-0'>
        {!isPending && totalPages > 1 && (
          <PaginationControls currentPage={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
