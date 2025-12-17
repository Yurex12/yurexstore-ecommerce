import { AlertCircle } from 'lucide-react';

export default function InlineError({
  message = 'Something went wrong.',
}: {
  message: string;
}) {
  return (
    <div className='flex gap-2 items-center justify-center px-4 py-2 border mt-4 rounded-sm'>
      <AlertCircle className='size-4 text-destructive' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  );
}
