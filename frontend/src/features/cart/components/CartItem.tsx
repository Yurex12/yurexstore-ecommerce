import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/helpers';
import { Minus, Plus } from 'lucide-react';
import useDecrementCartItem from '../hooks/useDecrementCartItem';
import useIncrementCartItem from '../hooks/useIncrementCartItem';
import useRemoveItemFromCart from '../hooks/useRemoveItemFromCart';
import type { CartWithRelation } from '../types';
import { Badge } from '@/components/ui/badge';

export default function CartItem({
  id: cartItemId,
  product: {
    name: productName,
    price: productPrice,
    category: { name: productCategory },
  },
  quantity: cartItemQuantity,
  productVariant,
}: CartWithRelation) {
  const { incrementCartItem, isPending: isIncrementing } =
    useIncrementCartItem();
  const { decrementCartItem, isPending: isDecrementing } =
    useDecrementCartItem();
  const { removeFromCart, isPending: isRemoving } = useRemoveItemFromCart();

  const isWorking = isIncrementing || isDecrementing || isRemoving;
  const totalPrice = productPrice * cartItemQuantity;

  return (
    <div className='flex items-center justify-between py-10'>
      {/* product info */}
      <div className='flex gap-x-4'>
        <img src='shirt.png' alt='' className='w-24' />
        <div className='flex flex-col md:space-y-2'>
          <p className='font-medium text-foreground'>{productName}</p>
          {/* <p className='text-muted-foreground text-xs'>{productCategory}</p> */}
          <p className='text-foreground/80 text-sm font-medium'>
            {formatCurrency(productPrice)}
          </p>
          {productVariant && (
            <Badge className='text-foreground/80' variant='outline'>
              {productVariant.value}
            </Badge>
          )}
          <button
            className='md:hidden text-sm mt-auto text-left font-semibold text-destructive/90 cursor-pointer'
            onClick={() => removeFromCart(cartItemId)}
            disabled={isWorking}
          >
            Remove
          </button>
        </div>
      </div>

      {/* quantity controls */}
      <div className='flex flex-col items-center gap-y-4'>
        <div className='flex items-center divide-x rounded-md border border-input'>
          <button
            className='sm:px-4 sm:py-2 px-2 py-1 text-foreground/70 cursor-pointer hover:bg-muted disabled:opacity-50'
            disabled={isWorking}
            onClick={() => decrementCartItem(cartItemId)}
          >
            <Minus size={20} />
          </button>

          <p className='sm:px-4 sm:py-2 px-2 py-1 flex items-center justify-center font-semibold text-foreground/70 text-sm'>
            {isIncrementing || isDecrementing ? (
              <Spinner />
            ) : (
              <span>{cartItemQuantity}</span>
            )}
          </p>

          <button
            className='sm:px-4 sm:py-2 px-2 py-1 text-foreground/70 cursor-pointer hover:bg-muted disabled:opacity-50'
            disabled={isWorking}
            onClick={() => incrementCartItem(cartItemId)}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* total for small screens */}
        <span className='block font-semibold text-foreground/70 md:hidden'>
          {formatCurrency(totalPrice)}
        </span>
      </div>

      {/* total for desktop */}
      <div className='hidden md:block'>
        <span className='font-semibold text-foreground'>
          {formatCurrency(totalPrice)}
        </span>
      </div>

      {/* remove for desktop */}
      <div className='hidden md:block'>
        <button
          className='mt-auto text-left font-semibold text-destructive/90 cursor-pointer'
          onClick={() => removeFromCart(cartItemId)}
          disabled={isWorking}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
