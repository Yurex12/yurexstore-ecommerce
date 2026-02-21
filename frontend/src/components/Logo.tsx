import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

function Logo({ className }: { className?: string }) {
  return (
    <Link
      to='/'
      className={cn(
        'flex items-center gap-2 font-semibold text-primary',
        className,
      )}
    >
      <span className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white text-sm font-bold'>
        N
      </span>

      <span className='text-lg tracking-tight'>Nexura</span>
    </Link>
  );
}

export default Logo;
