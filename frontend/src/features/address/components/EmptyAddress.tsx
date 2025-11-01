import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddressStore } from '../store/useAddressStore';

export function EmptyAddress() {
  const { showAddressForm } = useAddressStore();

  return (
    <div className='flex flex-col items-center justify-center py-4 space-y-3'>
      <h2>No address found</h2>
      <Button
        onClick={showAddressForm}
        variant='outline'
        className='border-primary border-dashed text-primary hover:text-primary/90'
      >
        <Plus />
        <span>Add Shipping Address</span>
      </Button>
    </div>
  );
}
