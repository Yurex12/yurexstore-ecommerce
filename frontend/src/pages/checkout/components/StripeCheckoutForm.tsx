import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

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
    <Dialog open>
      <DialogContent className='sm:max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='max-w-md mx-auto p-6 bg-white rounded-xl border border-input space-y-4'
        >
          <PaymentElement />
          <Button type='submit' disabled={isProcessing} className='w-full'>
            {isProcessing ? 'Processing...' : 'Pay'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
