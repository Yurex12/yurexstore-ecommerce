import EmptyState from '@/components/EmptyState';

import AddressCard from './AddressCard';

import ErrorState from '@/components/ErrorState';
import { useAddresses } from '../hooks/useAddresses';
import { AddressSkeleton } from './AddressesSkeleton';

export default function AddressesList() {
  const { addresses, isPending, error } = useAddresses();

  if (isPending) return <AddressSkeleton />;

  if (error)
    return (
      <ErrorState
        message='Unable to load Addresses.'
        className='h-[80svh] md:h-[60svh] border-0'
      />
    );

  if (!addresses?.length)
    return (
      <EmptyState
        message='No address found.'
        className='h-[80svh] md:h-[60svh] border-0'
      />
    );

  return (
    <div className='space-y-4'>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
}
