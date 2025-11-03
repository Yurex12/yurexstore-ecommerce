import { Spinner } from '@/components/ui/spinner';

import useCart from '../hooks/useCart';
import CartItem from './CartItem';
import { EmptyState } from '@/components/EmptyState';
import InlineError from '@/components/InlineError';

function CartItemsList() {
  const { cart, isPending, error } = useCart();

  if (isPending) {
    return (
      <div className='flex items-center gap-4'>
        <Spinner />
      </div>
    );
  }

  if (error) return <InlineError message='Unable to load cart' />;

  if (!cart?.length) return <EmptyState message='Cart not found' />;
  return (
    <>
      {cart.map((cart) => (
        <CartItem key={cart.id} {...cart} />
      ))}
    </>
  );
}

export default CartItemsList;
