import useUser from '@/features/auth/hooks/useUser';
import AddressCard from './components/AddressCard';
import ProfileCard from './components/ProfileCard';
import AccountOverviewSkeleton from './components/AccountOverviewSkeleton';

import { useAddresses } from '@/features/address/hooks/useAddresses';

export default function AccountOverviewPage() {
  const { isPending: isFetchingUser } = useUser();
  const { isPending: isFetchingAddresses } = useAddresses();

  if (isFetchingAddresses || isFetchingUser) return <AccountOverviewSkeleton />;
  return (
    <div className='space-y-6'>
      <div className='border-b pb-4 border-border'>
        <h2 className='text-xl font-semibold text-foreground'>
          Account Overview
        </h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <ProfileCard />
        <AddressCard />
      </div>
    </div>
  );
}
