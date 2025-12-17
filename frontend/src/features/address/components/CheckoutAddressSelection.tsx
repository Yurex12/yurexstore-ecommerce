import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { Plus } from 'lucide-react';
import { CheckoutAddressCard } from './CheckoutAddressCard';
import { useAddressStore } from '../store/useAddressStore';

export function CheckoutAddressSelection() {
  const {
    addresses,
    tempSelectedId,
    selectAddress,
    confirmSelection,
    cancelSelection,
    showAddressForm,
  } = useAddressStore();

  return (
    <div className='py-2'>
      <RadioGroup value={tempSelectedId} onValueChange={selectAddress}>
        <div className='max-h-[400px] overflow-y-auto space-y-4 scrollbar'>
          {addresses.map((address) => (
            <CheckoutAddressCard key={address.id} {...address} />
          ))}
        </div>
      </RadioGroup>

      <div className='flex flex-col sm:flex-row sm:justify-between gap-y-4 sm:items-center pt-4'>
        <Button
          onClick={showAddressForm}
          variant='ghost'
          className='text-primary w-fit hover:bg-primary/10 hover:text-primary'
        >
          <Plus />
          <span>Add New Address</span>
        </Button>

        <div className='flex gap-4 self-end'>
          <Button variant='outline' onClick={cancelSelection}>
            Cancel
          </Button>
          <Button onClick={confirmSelection}>Select Address</Button>
        </div>
      </div>
    </div>
  );
}
