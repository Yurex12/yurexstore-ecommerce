import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { InlineErrorProps } from '@/types';

export default function InlineError({
  message = 'Something went wrong.',
  onRetry,
}: InlineErrorProps) {
  return (
    <div className='flex flex-col gap-4 items-center justify-center p-4 text-center border mt-4 rounded-sm'>
      <div className='flex items-center gap-x-2 '>
        <AlertCircle className='size-4 text-destructive' />
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
      {onRetry && (
        <Button
          variant='outline'
          className='w-20'
          size='sm'
          onClick={() => {
            console.log('Hello');
            onRetry();
          }}
        >
          Retry
        </Button>
      )}
    </div>
  );
}
