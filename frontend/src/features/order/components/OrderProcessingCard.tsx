import { Spinner } from '@/components/ui/spinner';

export default function OrderProcessingCard() {
  return (
    <div className='space-y-2 flex flex-col items-center justify-center'>
      <Spinner className='text-primary size-16' />
      <h2 className='text-2xl font-semibold'>Processing Your Order</h2>

      <p className='text-muted-foreground'>
        Please wait while we confirm your payment...
      </p>
    </div>
  );
}
