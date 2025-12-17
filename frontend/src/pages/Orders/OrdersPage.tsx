import { Separator } from '@/components/ui/separator';
import OrdersList from '@/features/order/components/OrdersList';
import OrderTabs from '@/features/order/components/OrderTabs';
import useOrders from '@/features/order/hooks/useOrders';

export default function OrdersPage() {
  const { error, isPending, orders } = useOrders();
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>My Orders</h2>

      <Separator />

      {!(isPending || !orders?.length || error) && <OrderTabs />}

      <OrdersList />
    </div>
  );
}
