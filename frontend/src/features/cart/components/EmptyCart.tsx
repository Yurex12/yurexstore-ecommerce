import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center py-20 gap-4 text-center text-foreground/70'>
      <ShoppingCart className='w-16 h-16 text-muted-foreground' />
      <h2 className='text-xl font-semibold'>Your cart is empty</h2>
      <p className='text-sm text-foreground/60'>
        Looks like you haven't added anything to your cart yet.
      </p>
      <Button onClick={() => navigate('/shop')} className='px-6'>
        Start Shopping
      </Button>
    </div>
  );
}
