import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AddressesList from '@/features/address/components/AddressesList';
import { useAddresses } from '@/features/address/hooks/useAddresses';
import { useNavigate } from 'react-router-dom';

export default function AddressPage() {
  const navigate = useNavigate();

  const { addresses } = useAddresses();

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>
          Addresses ({addresses?.length})
        </h2>
        <Button onClick={() => navigate('/account/addresses/new')}>
          Add New Address
        </Button>
      </div>

      <Separator />

      <AddressesList />
    </div>
  );
}
