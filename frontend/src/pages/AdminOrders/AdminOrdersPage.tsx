import AdminOrdersTable from '@/features/order/components/AdminOrdersTable';

export default function AdminOrdersPage() {
  return (
    <section>
      <h1 className='heading'>Orders</h1>

      <AdminOrdersTable />
    </section>
  );
}
