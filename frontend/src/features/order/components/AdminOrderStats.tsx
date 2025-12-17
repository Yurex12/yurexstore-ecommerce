import { CheckCircle, Clock, Package, XCircle } from 'lucide-react';
import type { AdminOrder } from '../types';

export function AdminOrderStats({ orders }: { orders: AdminOrder[] }) {
  const { pending, delivered, cancelled } = orders.reduce(
    (acc, order) => {
      switch (order.orderStatus) {
        case 'PENDING':
          acc.pending += 1;
          break;
        case 'DELIVERED':
          acc.delivered += 1;
          break;
        case 'CANCELLED':
          acc.cancelled += 1;
          break;
      }
      return acc;
    },
    { pending: 0, delivered: 0, cancelled: 0 }
  );

  const statCards = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Pending Orders',
      value: pending,
      icon: Clock,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Delivered Orders',
      value: delivered,
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Cancelled Orders',
      value: cancelled,
      icon: XCircle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className={`rounded-xl border p-5`}>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-gray-600'>
                  {card.title}
                </p>
                <p className='text-3xl font-bold text-gray-900'>{card.value}</p>
              </div>
              <div
                className={`${card.bgColor} ${card.iconColor} rounded-lg p-3`}
              >
                <Icon className='h-6 w-6' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
