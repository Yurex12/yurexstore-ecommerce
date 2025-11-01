import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import type { Address } from '../types';

export function AddressCard({ address }: { address: Address }) {
  return (
    <Label
      htmlFor={address.id}
      className='flex gap-4 items-start border px-2 py-4 rounded cursor-pointer transition-colors hover:border-primary/50'
    >
      <RadioGroupItem value={address.id} id={address.id} />

      <div className='space-y-1'>
        <p className='text-sm font-medium text-foreground/90'>
          {`${address.firstName} ${address.lastName}`}
        </p>
        <p className='text-sm text-foreground/80'>
          {`${address.deliveryAddress} | ${address.city} | ${address.state}`}
        </p>
        <p className='text-sm text-foreground/70'>{address.phone}</p>
      </div>
    </Label>
  );
}
