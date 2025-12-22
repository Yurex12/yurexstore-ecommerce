import MobileFilterSort from '@/features/product/components/MobileProductFilterSort';
import { ProductFilters } from '@/features/product/components/ProductFilters';
import ProductsList from '@/features/product/components/ProductsList';
import ProductSort from '@/features/product/components/ProductSort';
import ProductsSearchQueryBadge from '@/features/product/components/ProductsSearchQueryBadge';

export default function ShopPage() {
  return (
    <div className='md:border md:px-4 md:py-2 md:rounded'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='heading'>Explore All Collections</h1>
          <ProductsSearchQueryBadge />
        </div>
        <ProductSort />
      </div>

      <div className='grid grid-cols-1 md:h-[75dvh] overflow-y-auto scrollbar justify-between gap-10 md:mt-4 md:grid-cols-[1fr_4fr] '>
        <ProductFilters />

        <ProductsList />
      </div>

      <MobileFilterSort />
    </div>
  );
}
