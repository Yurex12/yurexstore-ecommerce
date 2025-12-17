import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { useCart } from '@/features/cart/hooks/useCart';
import ProductVariantDialog from '@/features/product/components/ProductVariantDialog';
import { useRemoveFromWishlist } from '../hooks/useRemoveFromWishlist';

import { formatCurrency } from '@/lib/helpers';

import type { WishlistItem } from '../types';

export default function WishlistItem({
  id: wishlistItemId,
  product,
}: WishlistItem) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const { removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();

  const { addToCart, isPending: isAdding } = useAddToCart();

  const isWorking = isRemoving || isAdding;

  const inCart = cart?.find((cartItem) => cartItem.productId === product.id);

  function handleAddToCart() {
    if (!product.productVariants.length) {
      addToCart({ productId: product.id });
    } else {
      setOpen(true);
    }
  }
  return (
    <>
      <div className='p-4 border rounded-md bg-background sm:flex sm:items-center sm:justify-between space-y-2'>
        <div
          className={`
              flex gap-4 sm:mb-0
              ${product.quantity < 0 ? 'opacity-40 grayscale-50' : ''}
            `}
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            className='size-20 rounded-md object-cover'
          />

          <div>
            <h3 className='font-medium text-sm line-clamp-1'>{product.name}</h3>

            <p className='text-sm text-muted-foreground'>
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        <Separator className='block sm:hidden' />

        <div className='flex gap-2 items-center justify-between sm:justify-end'>
          <button
            onClick={() => removeFromWishlist(wishlistItemId)}
            className={`font-semibold text-destructive/80 text-sm py-2 px-4 rounded transition ${
              isWorking
                ? 'bg-destructive/10 cursor-not-allowed opacity-50'
                : 'hover:bg-destructive/5 cursor-pointer'
            }`}
            disabled={isWorking}
          >
            Remove
          </button>

          {product.quantity > 0 ? (
            inCart ? (
              <Button
                onClick={() => navigate('/cart')}
                variant='outline'
                className='w-28'
              >
                View in Cart
              </Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                className='w-28 cursor-pointer data-[isWorking]:cursor-not-allowed'
                disabled={isWorking}
              >
                Add to Cart
              </Button>
            )
          ) : (
            <Button disabled variant='outline' className='w-28'>
              Out of Stock
            </Button>
          )}
        </div>
      </div>

      <ProductVariantDialog product={product} open={open} setOpen={setOpen} />
    </>
  );
}
