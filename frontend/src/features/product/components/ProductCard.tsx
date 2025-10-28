import { useState } from 'react';

import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helpers';

import { Spinner } from '@/components/ui/spinner';

import type { Product } from '../types';

import useAddToCart from '@/features/cart/hooks/useAddToCart';

export default function ProductCard({
  id: productId,
  name,
  images,
  price,
  category,
  reviews,
  productVariant,
}: Product) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isPending } = useAddToCart();

  const navigate = useNavigate();

  const totalReviews = reviews.length;

  const rating = totalReviews
    ? reviews.reduce((acc, x) => acc + x.rating, 0)
    : 0;

  const avgRating = totalReviews ? (rating / totalReviews).toFixed(1) : 0;

  return (
    <div
      className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2'
      // onClick={() => navigate(`/products/${id}`)}
    >
      <div className='w-full h-48 sm:h-60 bg-muted/60 flex items-center justify-center relative'>
        <button
          className='absolute right-1 top-2 inline-block rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4'
          onClick={() => setIsLiked((cur) => !cur)}
        >
          <Heart
            className={`text-lg ${
              isLiked ? 'fill-primary text-primary' : 'text-foreground/50'
            }`}
          />
        </button>
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

        {productVariant.length ? (
          <Button
            className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
            variant='outline'
          >
            Add to cart
          </Button>
        ) : (
          <Button
            className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
            variant='outline'
            onClick={() => addToCart({ productId })}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <span>Add to cart</span>}
          </Button>
        )}
      </div>
    </div>
  );
}
