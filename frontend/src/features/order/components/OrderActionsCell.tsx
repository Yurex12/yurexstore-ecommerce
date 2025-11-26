import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Eye, Truck, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAdminCancelOrder from '../hooks/useAdminCancelOrder';
import useAdminCompleteOrder from '../hooks/useAdminCompleteOrder';
import type { AdminOrder } from '../types';

export default function OrderActionsCell({ order }: { order: AdminOrder }) {
  const { completeOrder, isPending: isDelivering } = useAdminCompleteOrder();
  const { cancelOrder, isPending: isCancelling } = useAdminCancelOrder();

  const isWorking = isDelivering || isCancelling;
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          disabled={isWorking}
        >
          <Ellipsis className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem
          onClick={() => navigate(`/admin/orders/${order.id}`)}
          disabled={isWorking}
          className='cursor-pointer'
        >
          <Eye className='mr-2 h-4 w-4' />
          View Details
        </DropdownMenuItem>

        {order.orderStatus === 'PENDING' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => completeOrder(order.id)}
              disabled={isWorking}
              className='cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50'
            >
              <Truck className='mr-2 h-4 w-4' />
              Mark as Delivered
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => cancelOrder(order.id)}
              disabled={isWorking}
              className='cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10'
            >
              <XCircle className='mr-2 h-4 w-4' />
              Cancel Order
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
