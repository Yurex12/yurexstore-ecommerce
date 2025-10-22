import OrderList from '@/features/order/components/OrderList';
import OrderTabs from '@/features/order/components/OrderTabs';

export default function OrdersPage() {
  return (
    <div className='space-y-4'>
      <div className='border-b pb-4 border-border'>
        <h2 className='text-xl font-semibold text-foreground'>My Orders</h2>
      </div>

      <OrderTabs />

      <OrderList />
    </div>
  );
}
