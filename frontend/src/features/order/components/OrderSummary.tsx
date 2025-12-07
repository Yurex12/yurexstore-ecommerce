import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

import OrderPriceSummary from './OrderPriceSummary';

import StripeCheckoutForm from '@/pages/checkout/components/StripeCheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { usePaymentStore } from '../store/usePaymentStore';
import type { OrderSummaryProps } from '../types';
import PaymentOptions from './PaymentOptions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)!;

export default function OrderSummary({
  clientSecret,
  onConfirmCashOrder,
  isProcessingCashOrder,
  onCreatePaymentIntent,
  isProcessingStripePayment,
  selectedAddress,
}: OrderSummaryProps) {
  const { selectedMethod } = usePaymentStore();

  return (
    <div className='border h-fit rounded-xl p-5 space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      <Separator />
      <PaymentOptions />

      <Separator />

      <OrderPriceSummary />

      {selectedMethod === 'STRIPE' && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm />
        </Elements>
      )}

      {selectedMethod === 'CASH_ON_DELIVERY' && (
        <Button
          className='w-full disabled:opacity-50'
          onClick={onConfirmCashOrder}
          disabled={!selectedAddress || isProcessingCashOrder}
        >
          {isProcessingCashOrder ? <Spinner /> : <span> Confirm Order</span>}
        </Button>
      )}

      {selectedMethod === 'STRIPE' && !clientSecret && (
        <Button
          className='w-full disabled:opacity-50'
          onClick={onCreatePaymentIntent}
          disabled={
            !selectedAddress || isProcessingStripePayment || !!clientSecret
          }
        >
          {isProcessingStripePayment ? (
            <Spinner />
          ) : (
            <span> Pay with stripe</span>
          )}
        </Button>
      )}
    </div>
  );
}
