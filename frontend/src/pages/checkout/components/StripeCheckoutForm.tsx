import { useState } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Spinner } from '@/components/ui/spinner';

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentReady, setIsPaymentReady] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        window.location.href = `/order-confirmation?payment_intent=${paymentIntent.id}`;
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto p-4 rounded-md border border-input space-y-4'
    >
      <PaymentElement onReady={() => setIsPaymentReady(true)} />
      <Button
        type='submit'
        disabled={isProcessing || !isPaymentReady}
        className='w-full disabled:opacity-50'
      >
        {isProcessing ? <Spinner /> : <span> Pay</span>}
      </Button>
    </form>
  );
}
