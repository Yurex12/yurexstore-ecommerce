import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import StarRating from '@/components/StarRating';
import ProductDescription from './ProductDescription';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { useCart } from '@/features/cart/hooks/useCart';
import { useDecrementCartItem } from '@/features/cart/hooks/useDecrementCartItem';
import { useIncrementCartItem } from '@/features/cart/hooks/useIncrementCartItem';
import { useAddToWishlist } from '@/features/wishlist/hooks/useAddToWishlist';
import { useRemoveFromWishlist } from '@/features/wishlist/hooks/useRemoveFromWishlist';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';

import { formatCurrency } from '@/lib/helpers';

import type { ProductDetails, ProductVariant } from '../types';

import { LoginRequiredDialog } from '@/components/LoginRequiredDialog';
import { useAuthAction } from '@/hooks/useAuthAction';

export default function ProductInfo({ product }: { product: ProductDetails }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.productVariants.length > 0 ? product.productVariants[0] : null
  );

  const [modalConfig, setModalConfig] = useState({ title: '', desc: '' });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const { performAction } = useAuthAction();

  const { addToCart, isPending: isAddingToCart } = useAddToCart();
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();

  const { isPending: isAddingToWishlist, addToWishlist } = useAddToWishlist();
  const { isPending: isRemovingFromWishlist, removeFromWishlist } =
    useRemoveFromWishlist();

  const {
    wishlist,
    isPending: isFetchingWishlist,
    error: wishlistError,
  } = useWishlist();
  const { cart, isPending: isFetchingCart } = useCart();

  const inCart = cart?.find((cartItem) => {
    if (cartItem.productVariant) {
      return cartItem.productVariantId === selectedVariant?.id;
    } else {
      return cartItem.productId === product.id;
    }
  });
  const productInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem.productId === product.id
  );
  const isWorking = isIncrementing || isDecrementing;

  const hasReachedStockLimit = inCart
    ? inCart.quantity >= product.quantity
    : false;

  const availableQuantity = selectedVariant
    ? selectedVariant?.quantity
    : product.quantity;

  const isOutOfStock = product.quantity === 0;

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
      }
    );
  }

  function handleAddToCart() {
    performAction(
      () =>
        addToCart({
          productId: product.id,
          productVariantId: selectedVariant?.id,
        }),
      () => {
        setModalConfig({
          title: 'Add to cart',
          desc: 'Sign in to save items to your cart and sync them across all your devices.',
        });
        setShowLoginModal(true);
      }
    );
  }

  return (
    <>
      <div className='space-y-6 md:px-4 '>
        {/* Title & Actions */}
        <div className='space-y-3'>
          <div className='flex items-start justify-between gap-4'>
            <h1 className='text-xl md:text-3xl font-bold text-slate-900 leading-tight'>
              {product.name}
            </h1>

            {!wishlistError ? (
              <button
                className='rounded-full bg-primary/5 p-1 shadow-sm hover:bg-primary/20 sm:right-4 disabled:opacity-50'
                onClick={handleWishlistToggle}
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
          </div>

          <StarRating
            rating={product.avgRating}
            reviewCount={product.reviewCount}
            showCount
            showRating
          />
        </div>

        <Badge variant='outline' className='flex items-center gap-2'>
          <div
            className='h-3 w-3 rounded-full'
            style={{ backgroundColor: product.color.code }}
          />
          <span className='capitalize'>{product.color.name}</span>
        </Badge>

        {/* Description */}
        <ProductDescription description={product.description} />

        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-slate-500'>Price</p>
            <p className='text-2xl md:text-4xl font-semibold'>
              {formatCurrency(product.price)}
            </p>
          </div>

          <div>
            {availableQuantity > 0 ? (
              <p className='text-sm font-medium text-slate-600'>
                Stock Available:{' '}
                <span className='text-slate-900'>{availableQuantity}</span>
              </p>
            ) : null}
          </div>
        </div>

        {/* Variant Selector */}
        {product.productVariants.length > 0 && (
          <div className='space-y-3'>
            <p className='text-lg font-semibold text-slate-900'>
              Select {product.variantTypeName}
            </p>

            <div className='flex flex-wrap gap-3'>
              {product.productVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-2 text-sm font-medium border rounded-md  ${
                    selectedVariant?.id === variant.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  {variant.value}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          {!inCart ? (
            <Button
              className='w-50 rounded'
              onClick={handleAddToCart}
              variant={isOutOfStock ? 'outline' : 'default'}
              disabled={
                isFetchingCart ||
                isAddingToCart ||
                isWorking ||
                hasReachedStockLimit ||
                isOutOfStock
              }
            >
              {isOutOfStock ? (
                'Out of stock'
              ) : isFetchingCart || isAddingToCart ? (
                <Spinner />
              ) : (
                <span className='flex gap-2'>
                  <ShoppingCart className='size-5 mr-2' />
                  Add to cart
                </span>
              )}
            </Button>
          ) : (
            <div className='flex justify-between items-center w-30'>
              <Button
                onClick={() => decrementCartItem(inCart.id)}
                disabled={isFetchingCart || isWorking}
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
                    () => setShowLoginModal(true)
                  )
                }
                disabled={isFetchingCart || isWorking || hasReachedStockLimit}
              >
                <Plus className='text-background' />
              </Button>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginRequiredDialog
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
          {...modalConfig}
        />
      )}
    </>
  );
}
