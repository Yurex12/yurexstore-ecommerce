import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-column-header';
import { format } from 'date-fns';
import type { AdminOrderDetails, OrderStatus, PaymentStatus } from '../types';
import OrderActionsCell from './OrderActionsCell';

export const columns: ColumnDef<Omit<AdminOrderDetails, 'orderItems'>>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order ID' />
    ),
    cell: ({ cell }) => {
      return <span>ORD-{cell.row.original.orderNumber}</span>;
    },
  },
  {
    accessorKey: 'user.name',
    header: 'Customer',
    cell: ({ cell }) => {
      console.log(cell.row.original);

      return <div>{cell.row.original.user.name}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Placed',
    cell: ({ cell }) =>
      format(new Date(cell.row.original.createdAt), 'dd-MM-yyyy'),
  },

  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus') as PaymentStatus;
      return (
        <div>
          <p
            className={`w-25 text-center py-1 px-3 rounded-md ${
              status === 'CONFIRMED'
                ? 'bg-green-100 text-green-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
    cell: ({ row }) => {
      const status = row.getValue('orderStatus') as OrderStatus;

      const statusConfig = {
        PENDING: 'bg-yellow-100 text-yellow-600',
        CANCELLED: 'bg-red-100 text-red-600',
        DELIVERED: 'bg-green-100 text-green-600',
      };

      return (
        <div>
          <p
            className={`w-25 text-center py-1 px-3 rounded-md ${statusConfig[status]}`}
          >
            {status}
          </p>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <OrderActionsCell orderId={row.original.id} />,
  },
];
