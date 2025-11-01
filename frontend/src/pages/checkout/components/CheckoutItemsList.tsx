import useCart from '@/features/cart/hooks/useCart';
import CheckoutItem from './CheckoutItem';
import { Spinner } from '@/components/ui/spinner';

export default function CheckoutItemsList() {
  const { isPending, cart, error } = useCart();

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
    <div className='lg:h-[420px] lg:overflow-y-scroll scrollbar px-4'>
      {cart.map((cartItem) => (
        <CheckoutItem key={cartItem.id} {...cartItem} />
      ))}
    </div>
  );
}
