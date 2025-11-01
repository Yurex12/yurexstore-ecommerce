import { Spinner } from '@/components/ui/spinner';
import useCart from '@/features/cart/hooks/useCart';
import { formatCurrency } from '@/lib/helpers';

export function OrderPriceSummary() {
  const { cart, isPending, error } = useCart();

  if (isPending) {
    return (
      <div className='flex items-center gap-4'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!cart?.length) {
    return <p>No products found</p>;
  }

  const totalPrice = cart
    .map((cartItem) =>
      cartItem.productVariant
        ? cartItem.productVariant.price * cartItem.quantity
        : cartItem.product.price * cartItem.quantity
    )
    .reduce((acc, price) => acc + price, 0);

  return (
    <div className='space-y-5 text-sm'>
      <div className='flex justify-between'>
        <span className='text-foreground/80'>Subtotal</span>
        <span className='font-medium text-foreground/70'>
          {formatCurrency(totalPrice)}
        </span>
      </div>
      <div className='flex justify-between'>
        <span className='text-foreground/80'>Shipping Cost</span>
        <span className='font-medium text-foreground/70'>$0.00</span>
      </div>
      <div className='border-t pt-3 flex justify-between'>
        <span className='font-semibold text-foreground'>Total</span>
        <span className='font-semibold text-foreground'>
          {formatCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
}
