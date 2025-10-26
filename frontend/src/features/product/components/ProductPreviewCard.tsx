import { formatCurrency } from '@/lib/helpers';
import { Star } from 'lucide-react';
import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export default function ProductPreviewCard({
  id,
  name,
  images,
  price,
  category,
  reviews,
}: Product) {
  const navigate = useNavigate();

  const totalReviews = reviews.length;

  const rating = totalReviews
    ? reviews.reduce((acc, x) => acc + x.rating, 0)
    : 0;

  const avgRating = totalReviews ? (rating / totalReviews).toFixed(1) : 0;

  return (
    <div
      className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2'
      onClick={() => navigate(`/products/${id}`)}
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
          {totalReviews > 0 && (
            <div className='flex gap-x-2 items-center'>
              <Star className='text-amber-400 fill-amber-400' size={18} />
              <span className='text-xs'>
                {avgRating} ({totalReviews})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
