import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OrderStatus from '../components/OrderStatus';

import type { Order } from '../types';
import { formatCurrency } from '@/lib/helpers';

export default function OrderCard({ order }: { order: Order }) {
  const navigate = useNavigate();

  return (
    <Card className='border rounded-xl shadow-none'>
      {/* Header */}
      <CardHeader className='flex flex-row items-center justify-between gap-2 pb-3 border-b border-border/30'>
        <div className='space-y-2'>
          <CardTitle className='text-sm text-foreground/90'>
            ORD-{order.orderNumber}
          </CardTitle>

          <p className='text-sm text-muted-foreground'>
            {format(new Date(order.createdAt), 'PPP')}
          </p>
        </div>

        <OrderStatus status={order.orderStatus} />
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='space-y-3'>
          {order.orderItems.slice(0, 3).map((orderItem) => (
            <div key={orderItem.id} className='flex items-center gap-3'>
              <img
                src={orderItem.productImage}
                alt={orderItem.productName}
                className='size-12 rounded-md border object-cover'
              />
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-foreground/90 flex gap-2 items-center'>
                  <span className='line-clamp-1'>{orderItem.productName}</span>

                  {orderItem.productVariantValue && (
                    <Badge variant='outline'>
                      {orderItem.productVariantValue}
                    </Badge>
                  )}
                </p>

                <p className='text-xs text-muted-foreground'>
                  Qty: {orderItem.quantity}
                </p>
              </div>
            </div>
          ))}

          {order.orderItems.length > 3 && (
            <p className='text-sm text-muted-foreground'>
              +{order.orderItems.length - 3} more item
              {order.orderItems.length - 3 > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between border-t border-border/30 pt-4'>
          <p className='text-sm text-foreground/80'>
            Total:{' '}
            <span className='font-semibold text-foreground/90'>
              {formatCurrency(order.totalPrice + order.deliveryFee)}
            </span>
          </p>
          <Button
            onClick={() => navigate(`/account/orders/${order.id}`)}
            variant='outline'
            size='sm'
            className='shadow-none text-foreground/70'
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
