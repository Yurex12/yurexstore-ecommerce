import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helpers';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className='rounded-lg p-4 border border-input'>
      {/* image */}
      <div className='relative'>
        <button
          className='absolute -right-1 top-2 inline-block rounded-full bg-indigo-50 p-1 shadow-sm hover:bg-indigo-200 sm:right-4'
          onClick={() => setIsLiked((cur) => !cur)}
        >
          <Heart
            className={`text-lg ${
              isLiked ? 'fill-primary text-primary' : 'text-gray-500'
            }`}
          />
        </button>

        <img src='shirt.png' alt='' className='w-full object-contain' />
      </div>

      <div className='mt-3 space-y-2'>
        {/*  name */}
        <p className='truncate text-[11px] font-semibold lg:text-sm'>
          Women Handbag
        </p>

        {/* category */}
        <p className='text-sm text-gray-500'>Bags</p>
        {/*  price */}
        <p className='text-sm font-semibold'>{formatCurrency(20)}</p>

        <Button className='w-full'>Add to cart</Button>
      </div>
    </div>
  );
}
