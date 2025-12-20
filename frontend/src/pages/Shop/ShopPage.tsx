import PaginationControls from '@/components/Pagination';
import MobileFilterSort from '@/features/product/components/MobileProductFilterSort';
import { ProductFilters } from '@/features/product/components/ProductFilters';
import ProductsList from '@/features/product/components/ProductsList';
import ProductSort from '@/features/product/components/ProductSort';
import ProductsSearchQueryBadge from '@/features/product/components/ProductsSearchQueryBadge';
import { useProducts } from '@/features/product/hooks/useProducts';

export default function ShopPage() {
  const { isPending, page, totalPages } = useProducts();

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='heading'>Explore All Collections</h1>
          <ProductsSearchQueryBadge />
        </div>

        <ProductSort />
      </div>

      <div className='grid grid-cols-1 justify-between gap-10 md:mt-10 md:grid-cols-[1fr_4fr]'>
        <ProductFilters />

        <ProductsList />
      </div>

      <div className='w-full flex justify-center md:justify-end mt-4 md:mt-0'>
        {!isPending && totalPages > 1 && (
          <PaginationControls currentPage={page} totalPages={totalPages} />
        )}
      </div>

      <MobileFilterSort />
    </div>
  );
}
