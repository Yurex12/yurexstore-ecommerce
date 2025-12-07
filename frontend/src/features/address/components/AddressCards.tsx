import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Trash2 } from 'lucide-react';
import type { Address } from '../types';
import { useDeleteAddress } from '../hooks/useDeleteAddress';
import { useChangeDefaultAddress } from '../hooks/useChangeDefaultAddress';

export default function AddressCards({ address }: { address: Address }) {
  const { deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { setDefaultAddress, isPending: isChangingToDefaultAddress } =
    useChangeDefaultAddress();
  return (
    <div
      key={address.id}
      className='border rounded-lg p-4 bg-background shadow-sm'
    >
      {/* Address details */}
      <div className='space-y-1'>
        <p className='font-medium text-foreground'>
          {address.firstName} {address.lastName}
        </p>
        <p className='text-sm text-muted-foreground'>
          {address.deliveryAddress}, {address.city}
        </p>
        <p className='text-sm text-muted-foreground'>{address.city}</p>
        <p className='text-sm text-muted-foreground'>{address.phone}</p>
      </div>

      {/* Default badge */}
      {address.default && <Badge className='mt-4 rounded px-2'>Default</Badge>}

      <Separator className='my-2' />

      {/* Actions */}
      <div className='flex items-center gap-2 justify-between'>
        <button
          onClick={() => setDefaultAddress(address.id)}
          disabled={address.default || isDeleting || isChangingToDefaultAddress}
          className='font-semibold text-primary/70 bg-primary/5 text-sm py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:text-foreground/20'
        >
          Set as Default
        </button>

        <div className='flex gap-x-4'>
          <Button
            size='sm'
            variant='secondary'
            className='text-primary'
            onClick={() => {}}
            // disabled={isDeleting}
          >
            <Edit size={16} />
          </Button>
          <Button
            size='sm'
            variant='secondary'
            className='text-primary'
            onClick={() => deleteAddress(address.id)}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
