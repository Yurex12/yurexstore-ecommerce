import { Heart, Minus, Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helpers';

import { Spinner } from '@/components/ui/spinner';

import type { Product } from '../types';

import useAddToCart from '@/features/cart/hooks/useAddToCart';
import useCart from '@/features/cart/hooks/useCart';
import useDecrementCartItem from '@/features/cart/hooks/useDecrementCartItem';
import useIncrementCartItem from '@/features/cart/hooks/useIncrementCartItem';
import useAddToWishlist from '@/features/wishlist/hooks/useAddToWishlist';
import useRemoveFromWishlist from '@/features/wishlist/hooks/useRemoveFromWishlist';
import useWishlist from '@/features/wishlist/hooks/useWishlist';
import { useProductDialogStore } from '../store/useProductDialogStore';
import ProductVariantDialog from './ProductVariantDialog';

export default function ProductCard(product: Product) {
  const {
    id: productId,
    name,
    images,
    price,
    category,
    reviews,
    productVariants,
  } = product;

  const { addToCart, isPending: isAddingToCart } = useAddToCart();
  const { toggleOpen } = useProductDialogStore();
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

  const totalReviews = reviews.length;

  const rating = totalReviews
    ? reviews.reduce((acc, x) => acc + x.rating, 0)
    : 0;

  const avgRating = totalReviews ? (rating / totalReviews).toFixed(1) : 0;

  const inCart = cart?.find((cartItem) => cartItem.productId === productId);

  const productInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem.productId === productId
  );

  const isWorking = isIncrementing || isDecrementing;

  function handleWishlistToggle() {
    if (productInWishlist) {
      removeFromWishlist(productInWishlist.id);
    } else {
      addToWishlist(productId);
    }
  }

  return (
    <>
      <div
        className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2'
        // onClick={() => navigate(`/products/${id}`)}
      >
        <div className='w-full h-48 sm:h-72 bg-muted/60 flex items-center justify-center relative'>
          <button
            className='absolute right-1 top-2 inline-block rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4 disabled:opacity-50'
            onClick={handleWishlistToggle}
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

          {productVariants?.length ? (
            <Button
              className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
              variant='outline'
              onClick={toggleOpen}
            >
              Add to cart
            </Button>
          ) : (
            <>
              {inCart ? (
                <div className='flex justify-between items-center'>
                  <Button
                    onClick={() => decrementCartItem(inCart.id)}
                    disabled={isWorking}
                  >
                    <Minus className='text-background' />
                  </Button>
                  <span className='text-foreground font-bold text-xl'>
                    {inCart.quantity}
                  </span>
                  <Button
                    onClick={() => incrementCartItem(inCart.id)}
                    disabled={isWorking}
                  >
                    <Plus className='text-background' />
                  </Button>
                </div>
              ) : (
                <Button
                  className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
                  variant='outline'
                  onClick={() => addToCart({ productId })}
                  disabled={isAddingToCart || isWorking}
                >
                  {isAddingToCart ? <Spinner /> : <span>Add to cart</span>}
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <ProductVariantDialog {...product} />
    </>
  );
}
