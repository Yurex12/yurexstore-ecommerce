import ErrorState from '@/components/ErrorState';
import NoData from '@/components/NoData';
import { PageLoader } from '@/components/PageLoader';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './AdminUserColumns';
import useUsers from '../hooks/useUsers';

export default function AdminUsersTable() {
  const { users, isPending, error } = useUsers();
  if (isPending) return <PageLoader message='Loading users...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!users?.length) return <NoData title='Orders' content='No users yet' />;

  return (
    <div className='container'>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
