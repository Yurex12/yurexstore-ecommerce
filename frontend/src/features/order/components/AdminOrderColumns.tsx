import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-column-header';
import { format } from 'date-fns';
import type { AdminOrder, OrderStatus, PaymentStatus } from '../types';
import { getPaymentColor, getStatusColor } from '../utils/helpers';
import OrderActionsCell from './OrderActionsCell';

export const columns: ColumnDef<AdminOrder>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order Number' />
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
            className={`w-25 text-center py-1 px-3 rounded-md ${getPaymentColor(
              status
            )}`}
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

      return (
        <div>
          <p
            className={`w-25 text-center py-1 px-3 rounded-md ${getStatusColor(
              status
            )}`}
          >
            {status}
          </p>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <OrderActionsCell order={row.original} />,
  },
];
