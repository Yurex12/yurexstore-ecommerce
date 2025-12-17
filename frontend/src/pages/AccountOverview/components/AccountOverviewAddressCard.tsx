import { Edit, MapPin } from 'lucide-react';

import InlineError from '@/components/InlineError';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddresses } from '@/features/address/hooks/useAddresses';
import { useNavigate } from 'react-router-dom';

export default function AddressCard() {
  const { addresses, isPending, error } = useAddresses();
  const navigate = useNavigate();

  if (isPending) return <p>Loading</p>;

  if (error) return <InlineError message='Unable to load address' />;

  if (!addresses?.length) return null;

  const address = addresses.find((addr) => addr.default);

  if (!address) return null;

  return (
    <Card className='border border-input rounded-xl hover:shadow-md transition-shadow shadow-none duration-200 flex-1'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='font-semibold text-lg text-foreground/90'>
          Address Book
        </CardTitle>
        <Button
          variant='secondary'
          className='cursor-pointer'
          onClick={() => navigate(`/account/addresses/form/${address.id}`)}
        >
          <Edit />
        </Button>
      </CardHeader>

      <CardContent className='text-sm text-muted-foreground'>
        <div className='flex items-start gap-3'>
          <MapPin className='size-5 text-primary mt-0.5' />
          <div className='space-y-1'>
            <p className='text-base font-medium text-foreground/90'>
              Default Shipping Address
            </p>
            <p>{`${address.firstName} ${address.lastName}`}</p>
            <p>{address.deliveryAddress}</p>
            <p>
              {address.city}, {address.state}
            </p>
            <p className='mt-1'>{address.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
