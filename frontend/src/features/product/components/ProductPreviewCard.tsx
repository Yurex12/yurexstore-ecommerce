import { formatCurrency } from '@/lib/helpers';
import { Star } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import type { FeaturedProducts } from '../types';

export default function ProductPreviewCard({
  id,
  name,
  images,
  price,
  category,
  avgRating,
  reviewCount,
}: FeaturedProducts) {
  const navigate = useNavigate();

  return (
    <div
      className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2'
      onClick={() => navigate(`/shop/${id}`)}
    >
      <div className='w-full h-48 sm:h-60 bg-muted/60 flex items-center justify-center'>
        <img
          src={images.at(0)?.url}
          alt={name}
          className='max-h-full max-w-full object-contain'
        />
      </div>

      <div className='space-y-2'>
        <p className='truncate text-sm font-medium text-foreground'>{name}</p>

        <p className='text-xs text-foreground/50'>{category.name}</p>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-foreground font-medium'>
            {formatCurrency(price)}
          </span>
          {reviewCount > 0 && (
            <div className='flex gap-x-2 items-center'>
              <Star className='text-amber-400 fill-amber-400' size={18} />
              <span className='text-xs'>
                {avgRating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
