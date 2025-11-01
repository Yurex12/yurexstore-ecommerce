import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderPriceSummary } from './OrderPriceSummary';
import PaymentOptions from './PaymentOptions';

export default function OrderSummary() {
  return (
    <div className='border h-fit rounded-xl p-5 space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      <Separator />
      <PaymentOptions />

      <Separator />

      <OrderPriceSummary />

      <Button className='w-full'>Confirm Order</Button>
    </div>
  );
}
