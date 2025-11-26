import ErrorState from '@/components/ErrorState';
import NoData from '@/components/NoData';
import { PageLoader } from '@/components/PageLoader';
import { DataTable } from '@/components/ui/data-table';
import useAdminOrders from '../hooks/useAdminOrders';
import { columns } from './AdminOrderColumns';

export default function AdminOrdersTable() {
  const { orders, isPending, error } = useAdminOrders();
  if (isPending) return <PageLoader message='Loading orders...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!orders?.length) return <NoData title='Orders' content='No orders yet' />;

  return (
    <div className='container'>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
