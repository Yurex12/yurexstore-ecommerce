import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({
  message = 'Something went wrong.',
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex gap-2 items-center justify-center px-4 py-2 border mt-4 rounded-sm',
        className
      )}
    >
      <AlertCircle className='size-5 text-destructive' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  );
}
