import ProductColors from './ProductColors';
import ProductGender from './ProductGender';

import { X } from 'lucide-react';

import ResetSearchParams from '@/components/ResetSearchParams';
import { SheetClose, SheetContent } from '@/components/ui/sheet';
import ProductCategories from './ProductCategories';

function MobileFilterOptions() {
  return (
    <SheetContent side='bottom'>
      <div className='flex justify-between border-b p-2 px-4'>
        <h3 className='text-lg'>Filter :</h3>
        <SheetClose asChild>
          <X className='text-2xl' />
        </SheetClose>
      </div>

      <div className='space-y-4 px-4 pb-10'>
        <ProductCategories />
        <ProductColors />
        <ProductGender />
        <ResetSearchParams />
      </div>
    </SheetContent>
  );
}

export default MobileFilterOptions;
