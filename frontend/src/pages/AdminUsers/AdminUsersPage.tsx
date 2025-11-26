import AdminUsersTable from '@/features/auth/components/AdminUsersTable';

export default function AdminUsersPage() {
  return (
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Users</h1>
      </div>

      <AdminUsersTable />
    </section>
  );
}
