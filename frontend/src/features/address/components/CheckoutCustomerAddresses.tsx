import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckoutAddressForm } from './CheckoutAddressForm';
import { CheckoutAddressSelection } from './CheckoutAddressSelection';
import { EmptyAddress } from './EmptyAddress';

import { useAddressStore } from '../store/useAddressStore';

import { useAddresses } from '../hooks/useAddresses';
import CustomerAddressSkeleton from './CustomerAddressSkeleton';
import InlineError from '@/components/InlineError';

export function CheckoutCustomerAddresses() {
  const { addresses, error, isPending } = useAddresses();
  const {
    view,
    showAddressSelection,
    setAddresses,
    selectAddress,
    selectedAddressId,
  } = useAddressStore();

  useEffect(() => {
    if (!error && !isPending && addresses) {
      setAddresses(addresses);

      const defaultAddr = addresses.find((a) => a.default);
      if (defaultAddr) {
        selectAddress(defaultAddr.id);
      }
    }
  }, [addresses, isPending, error, setAddresses, selectAddress]);

  if (isPending) {
    return <CustomerAddressSkeleton />;
  }

  if (error) return <InlineError message='Unable to load address' />;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  return (
    <div className='border px-4 py-2 rounded-md space-y-2'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>Customer Address</h1>
        {Boolean(addresses?.length) && (
          <Button
            variant='link'
            className='gap-x-0'
            onClick={showAddressSelection}
          >
            <span>Change</span> <ChevronRight />
          </Button>
        )}
      </div>

      <Separator />

      {view === 'display' && selectedAddress && (
        <div className='space-y-1'>
          <p className='font-medium text-foreground/90 text-sm sm:text-base'>
            {`${selectedAddress.firstName} ${selectedAddress.lastName}`}
          </p>
          <p className='text-sm'>
            {`${selectedAddress.deliveryAddress} | ${selectedAddress.city} | ${selectedAddress.state}`}
          </p>
          <p className='text-sm'>{selectedAddress.phone}</p>
        </div>
      )}

      {view === 'display' && !addresses?.length && <EmptyAddress />}
      {view === 'form' && <CheckoutAddressForm />}
      {view === 'selection' && <CheckoutAddressSelection />}
    </div>
  );
}
