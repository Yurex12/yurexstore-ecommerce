import AddressCard from './components/AddressCard';
import ProfileCard from './components/ProfileCard';

export default function AccountOverviewPage() {
  return (
    <div className='space-y-6 p-4 lg:p-8'>
      <div className='border-b pb-4 border-foreground/20'>
        <h2 className='text-xl font-semibold text-foreground'>
          Account Overview
        </h2>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        <ProfileCard />
        <AddressCard />
      </div>
    </div>
  );
}
