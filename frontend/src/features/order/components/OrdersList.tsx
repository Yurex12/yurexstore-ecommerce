import useOrders from '../hooks/useOrders';

import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import OrderCard from './OrderCard';
import OrdersSkeleton from './OrdersSkeleton';

import { useOrderStore } from '../store/useOrderStore';

export default function OrdersList() {
  const { orders, isPending, error } = useOrders();
  const { status } = useOrderStore();

  if (isPending) return <OrdersSkeleton />;

  if (error) return <InlineError message='Unable to fetch orders' />;

  if (!orders?.length) return <EmptyState message='No orders found' />;

  let filteredOrders;

  if (status === 'PENDING') {
    filteredOrders = orders.filter((order) => order.orderStatus === 'PENDING');
  } else if (status === 'DELIVERED') {
    filteredOrders = orders.filter(
      (order) => order.orderStatus === 'DELIVERED'
    );
  } else if (status === 'CANCELLED') {
    filteredOrders = orders.filter(
      (order) => order.orderStatus === 'CANCELLED'
    );
  } else {
    filteredOrders = orders;
  }

  if (!filteredOrders?.length) return <EmptyState message='No Data found' />;

  return (
    <ul className='space-y-4'>
      {filteredOrders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
