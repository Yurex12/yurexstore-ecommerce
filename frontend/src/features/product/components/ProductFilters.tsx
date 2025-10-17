import ResetSearchParams from '@/components/ResetSearchParams';
import ProductCategories from './ProductCategories';
import ProductColors from './ProductColors';
import ProductGender from './ProductGender';

export function ProductFilters() {
  return (
    <div className='hidden h-auto divide-y-1 space-y-4 md:block'>
      <ProductCategories />
      <ProductColors />
      <ProductGender />
      <ResetSearchParams />
    </div>
  );
}
