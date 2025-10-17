import CartItemsList from '@/features/cart/components/CartItemList';
import OrderSummary from '@/features/order/components/OrderSummary';

export default function CartPage() {
  return (
    <div>
      <h1 className='text-left text-2xl font-semibold text-gray-700 md:text-4xl'>
        Shopping Cart
      </h1>

      <div className='flex flex-col gap-x-14 lg:flex-row lg:justify-between'>
        <CartItemsList />
        <OrderSummary />
      </div>
    </div>
  );
}
