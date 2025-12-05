import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

import OrderPriceSummary from './OrderPriceSummary';

import { useAddressStore } from '@/features/address/store/useAddressStore';
import { usePaymentStore } from '../store/usePaymentStore';
import PaymentOptions from './PaymentOptions';

export default function OrderSummary({
  onOrder,
  disabled,
  isCreatingOrder,
  onPaymentIntent,
  isCreatingPaymentIntent,
  clientSecret,
}: {
  onOrder: VoidFunction;
  disabled: boolean;
  isCreatingOrder: boolean;
  onPaymentIntent: VoidFunction;
  isCreatingPaymentIntent: boolean;
  clientSecret: string | undefined;
}) {
  const { selectedAddressId } = useAddressStore();
  const { selectedMethod } = usePaymentStore();

  return (
    <div className='border h-fit rounded-xl p-5 space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      <Separator />
      <PaymentOptions />

      <Separator />

      <OrderPriceSummary />

      {selectedMethod === 'CASH_ON_DELIVERY' && (
        <Button
          className='w-full disabled:opacity-50'
          onClick={onOrder}
          disabled={isCreatingOrder || disabled || !selectedAddressId}
        >
          {isCreatingOrder ? <Spinner /> : <span> Confirm Order</span>}
        </Button>
      )}

      {selectedMethod === 'STRIPE' && (
        <Button
          className='w-full disabled:opacity-50'
          onClick={onPaymentIntent}
          disabled={isCreatingPaymentIntent || disabled || !!clientSecret}
        >
          {isCreatingPaymentIntent ? (
            <Spinner />
          ) : (
            <span> pay with stripe</span>
          )}
        </Button>
      )}
    </div>
  );
}
