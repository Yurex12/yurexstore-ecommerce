import ResetSearchParams from '@/components/ResetSearchParams';
import ProductCategories from './ProductCategories';
import ProductColors from './ProductColors';
import ProductGender from './ProductGender';

export default function ProductFilters() {
  return (
    <div className='hidden divide-y-1 px-1 sticky top-0 h-[75dvh] overflow-y-auto space-y-4 md:block scrollbar'>
      <ProductCategories />
      <ProductColors />
      <ProductGender />
      <ResetSearchParams />
    </div>
  );
}
