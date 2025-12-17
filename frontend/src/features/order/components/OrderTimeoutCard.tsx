import { useNavigate } from 'react-router-dom';

import { Watch } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function OrderTimeoutCard() {
  const navigate = useNavigate();
  return (
    <div className='space-y-2 flex flex-col items-center justify-center'>
      <Watch className='text-amber-400 size-16' />
      <h2 className='text-2xl font-semibold'>Taking Longer Than Expected</h2>
      <p className='text-muted-foreground'>
        We’re still confirming your order. This may take a little longer.
      </p>
      <Button onClick={() => navigate('/account/orders')} className='px-6'>
        View My Orders
      </Button>
    </div>
  );
}
