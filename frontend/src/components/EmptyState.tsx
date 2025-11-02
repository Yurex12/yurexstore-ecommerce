import { AlertCircle } from 'lucide-react';

export function EmptyState({
  message = 'No data available',
}: {
  message?: string;
}) {
  return (
    <div className='flex flex-col gap-2 items-center justify-center p-3 text-center border mt-4 rounded-sm'>
      <AlertCircle className='size-4 text-muted-foreground' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  );
}
