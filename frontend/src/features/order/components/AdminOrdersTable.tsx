import EmptyState from '@/components/EmptyState';
import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';
import useAdminOrders from '../hooks/useAdminOrders';
import { columns } from './AdminOrderColumns';

export default function AdminOrdersTable() {
  const { orders, isPending, error } = useAdminOrders();

  if (isPending) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!orders) return <EmptyState />;

  return (
    <div className='container'>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
