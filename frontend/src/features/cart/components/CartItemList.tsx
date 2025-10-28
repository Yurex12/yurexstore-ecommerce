import { Spinner } from '@/components/ui/spinner';
import useCart from '../hooks/useCart';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import useClearCart from '../hooks/useClearCart';

function CartItemsList() {
  const { cart, isPending, error } = useCart();
  const { clearCart } = useClearCart();

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
  return (
    <>
      <Button onClick={() => clearCart()}>Clear Cart</Button>
      <div className='basis-4/6 divide-y md:mt-4'>
        {cart.map((cart) => (
          <CartItem key={cart.id} {...cart} />
        ))}
      </div>
    </>
  );
}

export default CartItemsList;
