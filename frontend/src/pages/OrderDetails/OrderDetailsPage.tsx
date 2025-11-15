import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import { Separator } from '@/components/ui/separator';

import OrderDeliveryInfo from '@/features/order/components/OrderDeliveryInfo';
import OrderDetailsSkeleton from '@/features/order/components/OrderDetailsSkeleton';
import OrderItemsList from '@/features/order/components/OrderItemsList';
import OrderPaymentInfo from '@/features/order/components/OrderPaymentInfo';
import OrderStatus from '@/features/order/components/OrderStatus';
import useOrder from '@/features/order/hooks/useOrder';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { order, isPending, error } = useOrder(id);

  const navigate = useNavigate();

  if (isPending) return <OrderDetailsSkeleton />;

  if (error) return <InlineError message='Unable to load order' />;

  if (!order) return <EmptyState message='No data found' />;

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center gap-x-4'>
          <ArrowLeft onClick={() => navigate('/account/orders')} />
          <h2 className='text-xl font-semibold text-foreground'>
            Order Details
          </h2>
        </div>

        <Separator />
      </div>

      <div className='flex flex-col md:flex-row justify-between gap-y-1'>
        <div>
          <h2 className='text-md font-semibold text-foreground/80'>
            ORD-{order.orderNumber}
          </h2>
          <span className='text-sm text-muted-foreground'>
            Placed on {format(new Date(order.createdAt), 'PPP')}
          </span>
        </div>

        <OrderStatus status={order.orderStatus} />
      </div>

      <OrderItemsList orderItems={order.orderItems} />

      <div className='flex flex-col md:flex-row gap-4'>
        <OrderPaymentInfo
          paymentMethod={order.paymentMethod}
          deliveryFee={order.deliveryFee}
          totalPrice={order.totalPrice}
        />
        <OrderDeliveryInfo
          deliveryAddress={order.deliveryAddress}
          phone={order.phone}
        />
      </div>
    </div>
  );
}
