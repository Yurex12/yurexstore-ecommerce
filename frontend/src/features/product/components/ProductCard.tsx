import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helpers';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className='rounded-lg border border-input p-2 sm:p-4 space-y-2'>
      {/* image */}
      <div className='relative'>
        <button
          className='absolute -right-1 top-2 inline-block rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4'
          onClick={() => setIsLiked((cur) => !cur)}
        >
          <Heart
            className={`text-lg ${
              isLiked ? 'fill-primary text-primary' : 'text-foreground/50'
            }`}
          />
        </button>

        <img src='shirt.png' alt='' className='w-full object-contain' />
      </div>

      <div className='space-y-2'>
        <p className='truncate text-xs font-bold text-secondary-foreground/90 lg:text-sm'>
          Women Handbag
        </p>

        <p className='text-sm text-foreground/50'>Bags</p>

        <p className='text-sm font-semibold'>{formatCurrency(20)}</p>

        <Button className='w-full'>Add to cart</Button>
      </div>
    </div>
  );
}
