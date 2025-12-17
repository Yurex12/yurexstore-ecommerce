import { Skeleton } from '@/components/ui/skeleton';

export function AddressSkeleton() {
  return (
    <div className='space-y-4 mt-6'>
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={idx}
          className='p-4 border rounded-lg bg-background flex flex-col gap-3'
        >
          {/* Name and basic info */}
          <div className='space-y-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-48' />
            <Skeleton className='h-3 w-36' />
            <Skeleton className='h-3 w-24' />
          </div>

          {/* Default badge */}
          <Skeleton className='h-5 w-20 rounded-full mt-2' />

          <div className='flex items-center justify-between mt-3 gap-2'>
            {/* Set default button */}
            <Skeleton className='h-9 w-28 rounded-md' />

            {/* Edit / Delete buttons */}
            <div className='flex gap-2'>
              <Skeleton className='h-9 w-9 rounded-md' />
              <Skeleton className='h-9 w-9 rounded-md' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
