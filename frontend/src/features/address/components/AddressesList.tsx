import InlineError from '@/components/InlineError';
import EmptyState from '@/components/EmptyState';

import AddressCard from './AddressCard';

import { useAddresses } from '../hooks/useAddresses';
import { AddressSkeleton } from './AddressesSkeleton';

export default function AddressesList() {
  const { addresses, isPending, error } = useAddresses();

  if (isPending) return <AddressSkeleton />;

  if (error) {
    return <InlineError message='Unable to load Addresses.' />;
  }

  if (!addresses?.length) {
    return <EmptyState message='No address found.' />;
  }

  return (
    <div className='space-y-4'>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
}
