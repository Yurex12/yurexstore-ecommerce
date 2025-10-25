import ProductCard from '@/features/product/components/ProductCard';
import { ChevronRight } from 'lucide-react';

export default function ProductShowcase() {
  return (
    <div className='mx-auto mt-12'>
      <div className='flex justify-between items-center'>
        <h1 className='heading'>Products</h1>
        <ChevronRight className='font-bold' />
      </div>
      <div className='mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((product) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
}
