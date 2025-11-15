import { Separator } from '@/components/ui/separator';

import AdminOrdersList from '@/features/order/components/AdminOrdersList';

export default function AdminOrdersPage() {
  return (
    <section className='space-y-6'>
      <h1 className='heading'>All Orders</h1>

      <Separator />

      <AdminOrdersList />
    </section>
  );
}
