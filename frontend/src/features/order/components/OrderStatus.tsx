import { Badge } from '@/components/ui/badge';

export default function OrderStatus({
  status,
}: {
  status: 'processing' | 'delivered' | 'cancelled';
}) {
  return (
    <div>
      {status === 'delivered' && (
        <Badge variant='default'>{status.toUpperCase()}</Badge>
      )}
      {status === 'processing' && (
        <Badge variant='secondary'>{status.toUpperCase()}</Badge>
      )}
      {status === 'cancelled' && (
        <Badge variant='destructive'>{status.toUpperCase()}</Badge>
      )}
    </div>
  );
}
