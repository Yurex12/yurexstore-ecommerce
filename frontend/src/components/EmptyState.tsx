import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export function EmptyState({
  message = 'No data available',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex gap-2 items-center justify-center p-4 text-center border mt-4 rounded-sm',
        className
      )}
    >
      <AlertCircle className='size-4 text-muted-foreground' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  );
}
