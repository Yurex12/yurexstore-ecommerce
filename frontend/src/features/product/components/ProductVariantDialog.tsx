import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/helpers';
import { useState } from 'react';
import { useProductDialogStore } from '../store/useProductDialogStore';
import type { Product } from '../types';
import useAddToCart from '@/features/cart/hooks/useAddToCart';

export default function ProductVariantDialog({
  id: productId,
  productVariants,
  images,
  price: productPrice,
  name: productName,
}: Product) {
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const { open, setOpen } = useProductDialogStore();
  const { addToCart, isAdding } = useAddToCart();

  const itemPrice =
    productVariants.find((variant) => variant.id === selectedVariantId)
      ?.price || productPrice;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-xl w-10/12 rounded-2xl'>
        <DialogHeader>
          <DialogTitle>
            <h3 className='text-lg text-foreground'>Select a size</h3>
            <p className='text-foreground/60 text-sm'>{productName}</p>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          {/* Images grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
            {images.map((img) => (
              <div
                key={img.fileId}
                className='w-full h-40  bg-muted/70 flex items-center justify-center rounded-md'
              >
                <img
                  src={img.url}
                  alt={`Product ${productName}`}
                  className='max-w-full max-h-full object-contain rounded-md'
                />
              </div>
            ))}
          </div>

          {/* Variants */}
          <div className='flex flex-wrap gap-3'>
            {productVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-3 py-1 text-sm font-medium border rounded-md transition-all ${
                  selectedVariantId === variant.id
                    ? 'bg-primary text-primary-foreground border-primary scale-105'
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
              <Button
                className='w-40 border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary disabled:opacity-50'
                variant='outline'
                disabled={isAdding}
                onClick={() =>
                  addToCart({ productId, productVariantId: selectedVariantId })
                }
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
