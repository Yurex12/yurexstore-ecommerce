import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Ellipsis } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

import InlineError from '@/components/InlineError';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useAdminOrders from '../hooks/useAdminOrders';

import { formatCurrency } from '@/lib/helpers';
import { getPaymentColor, getStatusColor } from '../utils/helpers';

export default function AdminOrdersList() {
  const navigate = useNavigate();
  const { orders, isPending, error } = useAdminOrders();

  if (isPending) return <Spinner />;
  if (error) return <InlineError message='Unable to load orders' />;
  if (!orders?.length) return <EmptyState message='No orders found' />;

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[5%]'>Select</TableHead>
            <TableHead className='w-[15%]'>Order ID</TableHead>
            <TableHead className='w-[20%]'>Customer</TableHead>
            <TableHead className='w-[15%]'>Date</TableHead>
            <TableHead className='w-[15%]'>Delivery Status</TableHead>
            <TableHead className='w-[10%]'>Payment Status</TableHead>
            <TableHead className='w-[10%]'>Total</TableHead>
            <TableHead className='w-[10%] text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderNumber} className='border-b h-16'>
              <TableCell>
                <input type='checkbox' className='h-4 w-4' />
              </TableCell>

              <TableCell className='font-medium'>{`ORD-${order.orderNumber}`}</TableCell>

              {/* TODO: replace with customer name if available */}
              <TableCell>{order.user.name}</TableCell>

              <TableCell>
                {format(new Date(order.createdAt), 'dd-MM-yyyy')}
              </TableCell>

              <TableCell>
                <Badge className={getStatusColor(order.orderStatus)}>
                  {order.orderStatus}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge className={getPaymentColor(order.paymentStatus)}>
                  {order.paymentStatus}
                </Badge>
              </TableCell>

              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>

              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='ml-8'>
                    <Ellipsis className='text-2xl' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
