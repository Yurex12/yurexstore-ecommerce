import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

export default function AccountLayout() {
  return (
    <div className='grid grid-cols-[20rem_1fr]'>
      <AccountSidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
