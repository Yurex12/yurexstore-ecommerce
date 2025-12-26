import { useEffect } from 'react';

import MobileFilterSort from '@/features/product/components/MobileProductFilterSort';
import ProductFilters from '@/features/product/components/ProductFilters';
import ProductsList from '@/features/product/components/ProductsList';
import ProductSort from '@/features/product/components/ProductSort';
import ProductsSearchQueryBadge from '@/features/product/components/ProductsSearchQueryBadge';

export default function ShopPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='heading'>Explore All Goods</h1>
          <ProductsSearchQueryBadge />
        </div>
        <ProductSort />
      </div>

      <div className='grid grid-cols-1 md:h-[77dvh] overflow-y-auto scrollbar justify-between gap-10 md:mt-4 md:grid-cols-[1fr_4fr] '>
        <ProductFilters />

        <ProductsList />
      </div>

      <MobileFilterSort />
    </div>
  );
}
