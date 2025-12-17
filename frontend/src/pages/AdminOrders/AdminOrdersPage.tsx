import ErrorState from '@/components/ErrorState';
import NoData from '@/components/NoData';
import { PageLoader } from '@/components/PageLoader';
import AdminOrdersTable from '@/features/order/components/AdminOrdersTable';
import { AdminOrderStats } from '@/features/order/components/AdminOrderStats';
import useAdminOrders from '@/features/order/hooks/useAdminOrders';

export default function AdminOrdersPage() {
  const { orders, isPending, error } = useAdminOrders();
  if (isPending) return <PageLoader message='Loading orders...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!orders?.length) return <NoData title='Orders' content='No orders yet' />;

  return (
    <section className='space-y-4'>
      <h1 className='heading'>Orders</h1>
      <AdminOrderStats orders={orders} />

      <AdminOrdersTable orders={orders} />
    </section>
  );
}
