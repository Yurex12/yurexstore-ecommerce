import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

import OrderPriceSummary from './OrderPriceSummary';

import PaymentOptions from './PaymentOptions';
import { useAddressStore } from '@/features/address/store/useAddressStore';

export default function OrderSummary({
  onOrder,
  disabled,
  isCreatingOrder,
}: {
  onOrder: VoidFunction;
  disabled: boolean;
  isCreatingOrder: boolean;
}) {
  const { selectedAddressId } = useAddressStore();
  return (
    <div className='border h-fit rounded-xl p-5 space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      <Separator />
      <PaymentOptions />

      <Separator />

      <OrderPriceSummary />

      <Button
        className='w-full disabled:opacity-50'
        onClick={onOrder}
        disabled={isCreatingOrder || disabled || !selectedAddressId}
      >
        {isCreatingOrder ? <Spinner /> : <span> Confirm Order</span>}
      </Button>
    </div>
  );
}
