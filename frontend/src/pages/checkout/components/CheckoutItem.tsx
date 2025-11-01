import { Badge } from '@/components/ui/badge';
import type { CartWithRelation } from '@/features/cart/types';
import { formatCurrency } from '@/lib/helpers';

export default function CheckoutItem({
  product,
  productVariant,
  quantity,
}: CartWithRelation) {
  return (
    <div className='flex justify-between py-5 border-b-1 gap-x-2'>
      <div className='flex gap-x-3 lg:gap-x-5'>
        <div className='w-20 h-20 md:w-24 md:h-24 bg-muted/60 flex items-center justify-center'>
          <img
            src='shirt.png'
            className='max-h-full max-w-full object-contain'
          />
        </div>

        <div className='flex flex-col space-y-1 md:space-y-2'>
          <h1 className='font-normal text-foreground/70 text-sm sm:text-base'>
            {product.name}
          </h1>

          <span className='text-xs sm:text-sm text-muted-foreground/80 font-medium'>
            Black
          </span>
          {productVariant && (
            <Badge className='text-foreground/80 text-xs' variant='outline'>
              {productVariant.value}
            </Badge>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-y-1 items-end'>
        <span className='font-semibold text-foreground/70 text-sm sm:text-base'>
          {formatCurrency(
            productVariant ? productVariant.price : product.price
          )}
        </span>
        <span className='text-sm'>Qty: {quantity}</span>
      </div>
    </div>
  );
}
