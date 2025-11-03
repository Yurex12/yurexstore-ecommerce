import { Badge } from '@/components/ui/badge';

import type { OrderStatus } from '../types';

export default function OrderStatus({ status }: { status: OrderStatus }) {
  return (
    <div>
      {status === 'PENDING' && (
        <Badge className='bg-yellow-100 text-yellow-700 capitalize'>
          {status}
        </Badge>
      )}
      {status === 'DELIVERED' && (
        <Badge className='bg-green-100 text-green-700 capitalize'>
          {status}
        </Badge>
      )}
      {status === 'CANCELLED' && (
        <Badge className='bg-red-100 text-red-700 capitalize'>{status}</Badge>
      )}
    </div>
  );
}
