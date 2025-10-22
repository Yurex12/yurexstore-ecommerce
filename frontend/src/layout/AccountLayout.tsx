import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

export default function AccountLayout() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[16rem_1fr] md:h-[80dvh]  gap-x-10'>
      <AccountSidebar />

      <main className='md:bg-muted/50 rounded-sm md:h-full overflow-scroll md:p-6'>
        <Outlet />
      </main>
    </div>
  );
}
