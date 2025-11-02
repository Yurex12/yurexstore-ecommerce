import { Separator } from '@/components/ui/separator';
import { CustomerAddress } from '@/features/address/components/CustomerAddress';
import OrderSummary from '@/features/order/components/OrderSummary';
import CheckoutItemsList from './components/CheckoutItemsList';
import useCart from '@/features/cart/hooks/useCart';

export default function CheckoutPage() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[60%_35%] gap-5 justify-between lg:space-y-8'>
      <div className='space-y-6'>
        <CustomerAddress />

        <div className='border space-y-2 px-4 py-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Order Items</h1>
          <Separator />
          <CheckoutItemsList />
        </div>
      </div>

      <OrderSummary />
    </div>
  );
}
