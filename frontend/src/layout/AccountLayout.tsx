import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

export default function AccountLayout() {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-[80dvh]  gap-x-10'>
      <AccountSidebar />

      <main className='bg-muted/50 rounded-sm h-full overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
}
