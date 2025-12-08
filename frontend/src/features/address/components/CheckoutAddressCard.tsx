import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import type { Address } from '../types';

export function CheckoutAddressCard({
  id,
  firstName,
  lastName,
  city,
  deliveryAddress,
  state,
  phone,
}: Address) {
  return (
    <Label
      htmlFor={id}
      className='flex gap-4 items-start border px-2 py-4 rounded cursor-pointer transition-colors hover:border-primary/50'
    >
      <RadioGroupItem value={id} id={id} />

      <div className='space-y-1'>
        <p className='text-sm font-medium text-foreground/90'>
          {`${firstName} ${lastName}`}
        </p>
        <p className='text-sm text-foreground/80'>
          {`${deliveryAddress} | ${city} | ${state}`}
        </p>
        <p className='text-sm text-foreground/70'>{phone}</p>
      </div>
    </Label>
  );
}
