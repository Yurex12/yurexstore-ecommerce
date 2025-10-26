import MobileFilterSort from '@/features/product/components/MobileProductFilterSort';
import { ProductFilters } from '@/features/product/components/ProductFilters';
import ProductsList from '@/features/product/components/ProductsList';
import ProductSort from '@/features/product/components/ProductSort';

export default function ShopPage() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Explore All Collections</h1>

        <ProductSort />
      </div>

      <div className='grid grid-cols-1 justify-between gap-10 md:mt-10 md:grid-cols-[1fr_4fr]'>
        <ProductFilters />

        <ProductsList />
      </div>

      <MobileFilterSort />
    </div>
  );
}
