import InlineError from '@/components/InlineError';
import { useAddresses } from '../hooks/useAddresses';
import EmptyState from '@/components/EmptyState';
import AddressCards from './AddressCards';

export default function AddressesList() {
  const { addresses, isPending, error } = useAddresses();

  if (isPending) {
    return <p>Loading</p>;
  }

  if (error) {
    return <InlineError message='unable to load address.' />;
  }

  if (!addresses?.length) {
    return <EmptyState message='No address found.' />;
  }

  return (
    <div className='space-y-4'>
      {addresses.map((address) => (
        <AddressCards key={address.id} address={address} />
      ))}
    </div>
  );
}
