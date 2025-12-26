import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

export default function PageLoader({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 justify-center h-[75svh] md:h-[60svh] w-full',
        className
      )}
    >
      <Spinner className='h-10 w-10' />
      <p className='text-sm text-muted-foreground'>{message ?? 'Loading...'}</p>
    </div>
  );
}
