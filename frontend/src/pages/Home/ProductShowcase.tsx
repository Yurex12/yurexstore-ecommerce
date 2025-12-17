import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import ProductsPreviewList from '@/features/product/components/ProductsPreviewList';

export default function ProductShowcase() {
  return (
    <div className='mt-12 space-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='heading'>Products</h1>

        <Link className='pl-4 py-2' to='/shop'>
          <ChevronRight className='font-bold sm:size-10' />
        </Link>
      </div>

      <ProductsPreviewList />
    </div>
  );
}
