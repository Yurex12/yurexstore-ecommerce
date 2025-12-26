import { useCart } from '@/features/cart/hooks/useCart';
import CheckoutItem from './CheckoutItem';
import { Spinner } from '@/components/ui/spinner';
import InlineError from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';

export default function CheckoutItemsList() {
  const { isPending, cart, error } = useCart();

  if (isPending) {
    return (
      <div className='flex border w-full justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (error) <InlineError message='Unable to load cart items' />;

  if (!cart?.length) return <EmptyState message='No products found' />;

  return (
    <div className='lg:max-h-[420px] lg:overflow-y-scroll scrollbar px-4'>
      {cart.map((cartItem) => (
        <CheckoutItem key={cartItem.id} {...cartItem} />
      ))}
    </div>
  );
}
