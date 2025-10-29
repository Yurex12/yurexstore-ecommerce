import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useAddToCart from '@/features/cart/hooks/useAddToCart';

import { formatCurrency } from '@/lib/helpers';

import type { ProductVariantProps } from '../types';
import useCart from '@/features/cart/hooks/useCart';
import { Minus, Plus } from 'lucide-react';
import useIncrementCartItem from '@/features/cart/hooks/useIncrementCartItem';
import useDecrementCartItem from '@/features/cart/hooks/useDecrementCartItem';

export default function ProductVariantDialog({
  product,
  open,
  setOpen,
}: ProductVariantProps) {
  const [selectedVariantId, setSelectedVariantId] = useState('');

  const { addToCart, isPending: isAdding } = useAddToCart();
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();
  const { cart } = useCart();

  const inCart = cart?.find(
    (cartItem) => cartItem.productVariantId === selectedVariantId
  );

  const itemPrice =
    product.productVariants.find((variant) => variant.id === selectedVariantId)
      ?.price || product.price;

  const isWorking = isIncrementing || isDecrementing;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-xl w-10/12 rounded-2xl'>
        <DialogHeader>
          <DialogTitle>
            <h5 className='text-lg text-foreground'>
              Select a {product.variantTypeName}
            </h5>
            <p className='text-foreground/60 text-sm'>{product.name}</p>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          {/* Images grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
            {product.images.map((img) => (
              <div
                key={img.fileId}
                className='w-full h-40  bg-muted/70 flex items-center justify-center rounded-md'
              >
                <img
                  src={img.url}
                  alt={`Product ${product.name}`}
                  className='max-w-full max-h-full object-contain rounded-md'
                />
              </div>
            ))}
          </div>

          {/* Variants */}
          <div className='flex flex-wrap gap-3'>
            {product.productVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-3 py-2 text-sm font-medium border rounded-md  ${
                  selectedVariantId === variant.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-muted'
                }`}
              >
                {variant.value}
              </button>
            ))}
          </div>

          <div className='flex items-center justify-between'>
            <span className='font-semibold text-sm sm:text-base text-foreground'>
              {formatCurrency(itemPrice)}
            </span>

            {selectedVariantId && (
              <>
                {inCart ? (
                  <div className='flex items-center gap-x-4'>
                    <Button
                      className='px-3 py-2 text-sm font-medium border rounded-md'
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
                      className='px-3 py-2 text-sm font-medium border rounded-md'
                    >
                      <Plus className='text-background' />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='w-40 border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary disabled:opacity-50'
                    variant='outline'
                    disabled={isAdding || isWorking}
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        productVariantId: selectedVariantId,
                      })
                    }
                  >
                    Add to cart
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
