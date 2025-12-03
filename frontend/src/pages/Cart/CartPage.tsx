import { useNavigate } from 'react-router-dom';

import InlineError from '@/components/InlineError';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItemsList from '@/features/cart/components/CartItemList';
import CartSummary from '@/features/cart/components/CartSummary';
import EmptyCart from '@/features/cart/components/EmptyCart';
import { useCart } from '@/features/cart/hooks/useCart';
import CartLoadingSkeleton from '@/features/cart/components/CartLoadingSkeleton';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, isPending, error } = useCart();

  if (isPending) return <CartLoadingSkeleton />;

  if (error) return <InlineError message='Unable to load cart' />;

  if (!cart?.length) return <EmptyCart />;

  return (
    <div className='space-y-4'>
      <h1 className='text-left heading'>Shopping Cart ({cart.length})</h1>

      <Separator />

      <div className='grid grid-cols-1 gap-x-[5%] sm:grid-cols-[70%_25%] sm:justify-between'>
        <CartSummary />

        <div className='sm:max-h-[500px] sm:overflow-y-scroll py-2 scrollbar sm:border px-4 order-2 sm:order-1 '>
          <CartItemsList />
        </div>
      </div>

      <div className='sticky bottom-2 sm:hidden'>
        <Button className='w-full py-6' onClick={() => navigate('/checkout')}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
