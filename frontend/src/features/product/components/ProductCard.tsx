import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Heart, Minus, Plus, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import ProductVariantDialog from './ProductVariantDialog';

import useAddToCart from '@/features/cart/hooks/useAddToCart';
import useCart from '@/features/cart/hooks/useCart';
import useDecrementCartItem from '@/features/cart/hooks/useDecrementCartItem';
import useIncrementCartItem from '@/features/cart/hooks/useIncrementCartItem';
import useAddToWishlist from '@/features/wishlist/hooks/useAddToWishlist';
import useRemoveFromWishlist from '@/features/wishlist/hooks/useRemoveFromWishlist';
import useWishlist from '@/features/wishlist/hooks/useWishlist';

import type { Product } from '../types';
import { formatCurrency } from '@/lib/helpers';

export default function ProductCard(product: Product) {
  const [open, setOpen] = useState(false);

  const { addToCart, isPending: isAddingToCart } = useAddToCart();
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();
  const { wishlist } = useWishlist();
  const { isPending: isAddingToWishlist, addToWishlist } = useAddToWishlist();
  const { isPending: isRemovingFromWishlist, removeFromWishlist } =
    useRemoveFromWishlist();
  const { cart } = useCart();

  const navigate = useNavigate();

  const totalReviews = product.reviews.length;
  const rating = totalReviews
    ? product.reviews.reduce((acc, x) => acc + x.rating, 0)
    : 0;
  const avgRating = totalReviews ? (rating / totalReviews).toFixed(1) : 0;

  const inCart = cart?.find((cartItem) => cartItem.productId === product.id);
  const productInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem.productId === product.id
  );
  const isWorking = isIncrementing || isDecrementing;

  const hasReachedStockLimit = inCart
    ? inCart.quantity >= product.quantity
    : false;

  function handleWishlistToggle() {
    if (productInWishlist) removeFromWishlist(productInWishlist.id);
    else addToWishlist(product.id);
  }

  return (
    <>
      <div
        className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2 flex flex-col h-full justify-between'
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Image + Wishlist */}
        <div className='w-full h-48 sm:h-72 bg-muted/60 flex items-center justify-center relative'>
          <button
            className='absolute right-1 top-2 inline-block rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4 disabled:opacity-50'
            onClick={(e) => {
              e.stopPropagation();
              handleWishlistToggle();
            }}
            disabled={isAddingToWishlist || isRemovingFromWishlist}
          >
            <Heart
              className={`text-lg ${
                productInWishlist
                  ? 'fill-primary text-primary'
                  : 'text-foreground/50'
              }`}
            />
          </button>
          <img
            src={product.images.at(0)?.url}
            alt={product.name}
            className='max-h-full max-w-full object-contain'
          />
        </div>

        {/* Product info */}
        <div className='space-y-2'>
          <p className='truncate text-sm font-medium text-foreground'>
            {product.name}
          </p>
          <p className='text-xs text-foreground/50'>{product.category.name}</p>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-foreground font-medium'>
              {formatCurrency(product.price)}
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

          {hasReachedStockLimit && (
            <p className='text-xs text-destructive text-center'>
              Maximum stock reached
            </p>
          )}

          {/* Add to Cart / Quantity */}
          {product.productVariants?.length ? (
            <Button
              className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
              variant='outline'
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              Add to cart
            </Button>
          ) : inCart ? (
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between items-center'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    decrementCartItem(inCart.id);
                  }}
                  disabled={isWorking}
                >
                  <Minus className='text-background' />
                </Button>
                <span className='text-foreground font-bold text-xl'>
                  {inCart.quantity}
                </span>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    incrementCartItem(inCart.id);
                  }}
                  disabled={isWorking || hasReachedStockLimit}
                >
                  <Plus className='text-background' />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
              variant='outline'
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ productId: product.id });
              }}
              disabled={
                isAddingToCart ||
                isWorking ||
                hasReachedStockLimit ||
                product.quantity === 0
              }
            >
              {product.quantity === 0 ? (
                'Out of stock'
              ) : isAddingToCart ? (
                <Spinner />
              ) : (
                'Add to cart'
              )}
            </Button>
          )}
        </div>
      </div>

      <ProductVariantDialog product={product} open={open} setOpen={setOpen} />
    </>
  );
}
