import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/helpers';
import useCart from '../hooks/useCart';

export default function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalPrice = cart?.reduce(
    (acc, item) =>
      acc + (item.productVariant?.price || item.product.price) * item.quantity,
    0
  );

  if (!totalPrice) return null;

  const totalItems = cart?.length ?? 0;

  return (
    <div className='space-y-2 h-fit sm:space-y-4 bg-muted/30 p-4 rounded-md order-1 sm:order-2'>
      <h3 className='text-foreground/70'>Cart summary</h3>

      <div className='flex justify-between items-center text-sm'>
        <span className='text-foreground/70'>
          Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})
        </span>
        <span className='font-semibold'>{formatCurrency(totalPrice)}</span>
      </div>

      <Button
        className='w-full hidden sm:flex'
        onClick={() => navigate('/checkout')}
      >
        Checkout
      </Button>
    </div>
  );
}
