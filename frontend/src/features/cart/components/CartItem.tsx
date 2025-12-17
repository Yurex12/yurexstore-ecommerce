import { Minus, Plus, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { useDecrementCartItem } from '../hooks/useDecrementCartItem';
import { useIncrementCartItem } from '../hooks/useIncrementCartItem';
import { useRemoveItemFromCart } from '../hooks/useRemoveItemFromCart';
import { formatCurrency } from '@/lib/helpers';
import type { CartWithRelation } from '../types';

export default function CartItem(cartItem: CartWithRelation) {
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();
  const { removeFromCart, isPending: isRemoving } = useRemoveItemFromCart();

  const isWorking = isIncrementing || isDecrementing || isRemoving;

  const hasReachedStockLimit =
    cartItem.quantity >=
    (cartItem.productVariant?.quantity || cartItem.product.quantity);

  return (
    <div className='py-4 border-b space-y-4'>
      {/* top section */}
      <div className='flex gap-4 sm:gap-6'>
        <div className='size-20 rounded bg-muted/60 flex items-center justify-center'>
          <img
            src={cartItem.product.images[0].url}
            alt={cartItem.product.name}
            className='max-h-full max-w-full object-contain rounded'
          />
        </div>

        <div className='flex-1 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 min-w-0'>
          <div className='flex-1 flex flex-col justify-between min-w-0'>
            <p className='text-foreground/70 text-sm line-clamp-2 sm:text-base min-w-0'>
              {cartItem.product.name}
            </p>
            {cartItem.productVariant && (
              <Badge className='text-foreground/80 mt-1' variant='outline'>
                {cartItem.productVariant.value}
              </Badge>
            )}
          </div>

          <p className='text-foreground text-sm sm:text-base font-medium whitespace-nowrap'>
            {formatCurrency(
              cartItem.productVariant?.price || cartItem.product.price
            )}
          </p>
        </div>
      </div>

      <div className='flex sm:flex-row justify-between items-start sm:items-center gap-1'>
        <button
          className='flex gap-x-2 items-center text-sm sm:text-base font-medium text-destructive/70 cursor-pointer disabled:opacity-50'
          onClick={() => removeFromCart(cartItem.id)}
          disabled={isWorking}
        >
          <Trash />
          <span>Remove</span>
        </button>

        <div className='flex flex-col items-start sm:items-center gap-1'>
          <div className='flex items-center gap-x-2 sm:gap-x-4'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                decrementCartItem(cartItem.id);
              }}
              disabled={isWorking}
              className='p-2 bg-primary rounded-md disabled:opacity-50 flex items-center justify-center'
            >
              <Minus className='text-background' size={15} />
            </button>

            <p className='flex items-center justify-center font-semibold text-foreground/70 w-5'>
              {isIncrementing || isDecrementing ? (
                <Spinner />
              ) : (
                <span>{cartItem.quantity}</span>
              )}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                incrementCartItem(cartItem.id);
              }}
              disabled={isWorking || hasReachedStockLimit}
              className='p-2 bg-primary rounded-md disabled:opacity-50 flex items-center justify-center'
            >
              <Plus className='text-background' size={15} />
            </button>
          </div>

          {hasReachedStockLimit && (
            <p className='text-xs text-destructive mt-1'>
              Maximum stock reached
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
