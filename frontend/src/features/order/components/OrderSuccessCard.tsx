import { CheckCircle } from 'lucide-react';

export default function OrderSuccessCard() {
  return (
    <div className='space-y-2 flex flex-col items-center justify-center'>
      <CheckCircle className='text-green-600 size-16' />

      <h2 className='text-2xl font-semibold'>Order Confirmed!</h2>
      <p className='text-muted-foreground'>Redirecting...</p>
    </div>
  );
}
