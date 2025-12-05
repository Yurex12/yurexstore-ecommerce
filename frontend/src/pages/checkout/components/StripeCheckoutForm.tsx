import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { Button } from '@/components/ui/button';

export default function StripeCheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!elements || !stripe) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    setIsProcessing(false);

    if (error) {
      toast.error(error.message || 'Something went wrong');
    } else if (paymentIntent.status === 'succeeded') {
      toast.success('Payment Successful');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-1/2'>
      <CardElement />
      <Button type='submit' disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'pay'}
      </Button>
    </form>
  );
}
