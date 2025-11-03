import { formatCurrency } from '@/lib/helpers';
import type { OrderItem } from '../types';

export default function OrderItemsList({
  orderItems,
}: {
  orderItems: OrderItem[];
}) {
  return (
    <div className='space-y-3'>
      {orderItems.map((orderItem) => (
        <div
          key={orderItem.id}
          className='flex items-center gap-4 border rounded-lg p-3 bg-background'
        >
          <img
            src={orderItem.productImage}
            alt={orderItem.productName}
            className='size-16 rounded object-cover'
          />

          <div className='flex-1'>
            <h4 className='font-medium'>{orderItem.productName}</h4>
            <p className='text-sm text-muted-foreground'>
              Qty: {orderItem.quantity}
            </p>
          </div>

          <p className='font-semibold text-muted-foreground '>
            {formatCurrency(orderItem.productPrice * orderItem.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
}
