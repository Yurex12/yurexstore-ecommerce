import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import type { WishlistItem } from '../types';
import { formatCurrency } from '@/lib/helpers';
import useRemoveFromWishlist from '../hooks/useRemoveFromWishlist';
import useAddToWishlist from '../hooks/useAddToWishlist';

export default function WishlistItem({
  id: wishlistItemId,
  product: {
    id: productId,
    images,
    name: productName,
    price: productPrice,
    quantity: productQuantity,
  },
}: WishlistItem) {
  const { removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const { addToWishlist, isPending: isAdding } = useAddToWishlist();

  const isWorking = isRemoving || isAdding;
  return (
    <div className='p-4 border rounded-md bg-background sm:flex sm:items-center sm:justify-between space-y-2'>
      <div
        className={`
              flex gap-4 sm:mb-0
              ${productQuantity < 0 ? 'opacity-40 grayscale-50' : ''}
            `}
      >
        <img
          src={images[0].url}
          alt={productName}
          className='w-20 h-20 rounded-md object-cover'
        />

        <div>
          <h3 className='font-medium'>{productName}</h3>
          <p className='text-sm text-muted-foreground'>
            {formatCurrency(productPrice)}
          </p>
        </div>
      </div>

      <Separator className='block sm:hidden' />

      <div className='flex gap-2 items-center justify-between sm:justify-end'>
        <button
          onClick={() => removeFromWishlist(wishlistItemId)}
          className={`
    font-semibold text-destructive/80 text-sm py-2 px-4 rounded transition 
    ${
      isWorking
        ? 'bg-destructive/10 cursor-not-allowed opacity-50'
        : 'hover:bg-destructive/5 cursor-pointer'
    }
  `}
          disabled={isWorking}
        >
          Remove
        </button>

        {productQuantity > 0 ? (
          <Button
            // onClick={() => handleAddToCart(item.id)}
            className='w-28 cursor-pointer data-[isWorking]:cursor-not-allowed'
            disabled={isWorking}
          >
            Add to Cart
          </Button>
        ) : (
          <Button disabled variant='outline' className='w-28'>
            Out of Stock
          </Button>
        )}
      </div>
    </div>
  );
}
