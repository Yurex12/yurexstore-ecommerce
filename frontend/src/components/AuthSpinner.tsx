// components/ui/spinner.tsx
import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

export default function AuthSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-[85svh] w-full items-center justify-center md:h-[600px]',
        className
      )}
    >
      <Spinner className='size-10' />
    </div>
  );
}
