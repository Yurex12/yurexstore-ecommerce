import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderActionsCell({ orderId }: { orderId: string }) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-8'>
        <Ellipsis className='text-2xl' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate(`/admin/orders/${orderId}`)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          Mark As Delivered
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
