import CartItemsList from '@/features/cart/components/CartItemList';
import OrderSummary from '@/features/order/components/OrderSummary2';

export default function CartPage() {
  return (
    <div>
      <h1 className='text-left heading'>Shopping Cart</h1>

      <div className='flex flex-col gap-x-14 lg:flex-row lg:justify-between'>
        <CartItemsList />
        <OrderSummary />
      </div>
    </div>
  );
}
