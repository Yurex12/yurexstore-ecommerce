import { Separator } from '@/components/ui/separator';
import OrdersList from '@/features/order/components/OrdersList';
import OrderTabs from '@/features/order/components/OrderTabs';

export default function OrdersPage() {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>My Orders</h2>

      <Separator />

      <OrderTabs />

      <OrdersList />
    </div>
  );
}
