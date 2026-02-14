import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import ProductVariantDialog from './ProductVariantDialog';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { useCart } from '@/features/cart/hooks/useCart';
import { useDecrementCartItem } from '@/features/cart/hooks/useDecrementCartItem';
import { useIncrementCartItem } from '@/features/cart/hooks/useIncrementCartItem';
import { useAddToWishlist } from '@/features/wishlist/hooks/useAddToWishlist';
import { useRemoveFromWishlist } from '@/features/wishlist/hooks/useRemoveFromWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import useUser from '@/features/auth/hooks/useUser';

import { LoginRequiredDialog } from '@/components/LoginRequiredDialog';
import { useAuthAction } from '@/hooks/useAuthAction';
import { formatCurrency } from '@/lib/helpers';
import type { Product } from '../types';

export default function ProductCard(product: Product) {
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', desc: '' });
  const navigate = useNavigate();

  const { isAuthenticated } = useUser();
  const { performAction } = useAuthAction();

  const { addToCart, isPending: isAddingToCart } = useAddToCart();
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();

  const {
    wishlist,
    isPending: isFetchingWishlist,
    error: wishlistError,
  } = useWishlist();
  const { cart, isPending: isFetchingCart } = useCart();

  const { isPending: isAddingToWishlist, addToWishlist } = useAddToWishlist();
  const { isPending: isRemovingFromWishlist, removeFromWishlist } =
    useRemoveFromWishlist();

  const inCart = cart?.find((cartItem) => cartItem.productId === product.id);
  const productInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem.productId === product.id,
  );
  const isWorking = isIncrementing || isDecrementing;

  const hasReachedStockLimit = inCart
    ? inCart.quantity >= product.quantity
    : false;

  const showCartLoading = isAuthenticated && isFetchingCart;

  function handleWishlistToggle() {
    performAction(
      () => {
        if (productInWishlist) removeFromWishlist(productInWishlist.id);
        else addToWishlist(product.id);
      },
      () => {
        setModalConfig({
          title: 'Save to Wishlist',
          desc: 'Sign in to save your favorites.',
        });
        setShowLoginModal(true);
      },
    );
  }

  function handleAddToCart() {
    performAction(
      () => addToCart({ productId: product.id }),
      () => {
        setModalConfig({
          title: 'Add to cart',
          desc: 'Sign in to save items to your cart and sync them across all your devices.',
        });
        setShowLoginModal(true);
      },
    );
  }

  return (
    <div className='p-1 border border-input/50 pb-2 sm:p-4 space-y-2 flex flex-col h-fit justify-between'>
      <div
        className='cursor-pointer space-y-2'
        onClick={() => navigate(`/shop/${product.id}`)}
      >
        {/* Image + Wishlist */}
        <div className='w-full h-48 sm:h-72 bg-muted/60 flex items-center justify-center relative'>
          {!wishlistError ? (
            <button
              className='absolute right-1 top-2 z-10 inline-block rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4 disabled:opacity-50'
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle();
              }}
              disabled={
                isAddingToWishlist ||
                isRemovingFromWishlist ||
                isFetchingWishlist
              }
            >
              <Heart
                className={`text-lg ${
                  productInWishlist
                    ? 'fill-primary text-primary'
                    : 'text-foreground/50'
                }`}
              />
            </button>
          ) : null}
          <img
            src={product.images.at(0)?.url}
            alt={product.name}
            className='h-full w-full object-cover'
          />
        </div>

        {/* Product info */}
        <div className='space-y-2'>
          <p className='truncate text-sm font-medium text-foreground'>
            {product.name}
          </p>
          <p className='text-xs text-foreground/50 capitalize'>
            {product.category.name}
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-foreground font-medium'>
              {formatCurrency(product.price)}
            </span>
            {product.reviewCount > 0 && (
              <div className='flex gap-x-2 items-center'>
                <Star className='text-amber-400 fill-amber-400' size={18} />
                <span className='text-xs'>
                  {product.avgRating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-2 space-y-2'>
        {hasReachedStockLimit && !product.productVariants.length && (
          <p className='text-xs text-destructive text-center'>
            Maximum stock reached
          </p>
        )}

        {product.productVariants?.length ? (
          <Button
            className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
            variant='outline'
            disabled={showCartLoading || product.quantity === 0}
            onClick={() => setOpen(true)}
          >
            {product.quantity === 0 ? (
              <span>Out of stock</span>
            ) : showCartLoading ? (
              <Spinner />
            ) : (
              <span>Add to cart</span>
            )}
          </Button>
        ) : inCart ? (
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <Button
                onClick={() => decrementCartItem(inCart.id)}
                disabled={showCartLoading || isWorking}
              >
                <Minus className='text-background' />
              </Button>
              <span className='text-foreground font-bold text-xl'>
                {inCart.quantity}
              </span>
              <Button
                onClick={() =>
                  performAction(
                    () => incrementCartItem(inCart.id),
                    () => setShowLoginModal(true),
                  )
                }
                disabled={showCartLoading || isWorking || hasReachedStockLimit}
              >
                <Plus className='text-background' />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
            variant='outline'
            onClick={handleAddToCart}
            disabled={
              showCartLoading ||
              isAddingToCart ||
              isWorking ||
              hasReachedStockLimit ||
              product.quantity === 0
            }
          >
            {product.quantity === 0 ? (
              'Out of stock'
            ) : showCartLoading || isAddingToCart ? (
              <Spinner />
            ) : (
              'Add to cart'
            )}
          </Button>
        )}
      </div>

      {open && (
        <ProductVariantDialog product={product} open={open} setOpen={setOpen} />
      )}

      {showLoginModal && (
        <LoginRequiredDialog
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
          {...modalConfig}
        />
      )}
    </div>
  );
}
