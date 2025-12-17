import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className='grid min-h-[80vh] grid-cols-1 gap-x-6 md:grid-cols-[16rem_1fr]'>
      <AdminSidebar />
      <main className='rounded-sm h-full overflow-y-scroll md:p-6 scrollbar'>
        <Outlet />
      </main>
    </div>
  );
}
