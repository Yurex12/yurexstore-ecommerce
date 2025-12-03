import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <div className='mt-3 grid grid-cols-2 gap-1 sm:gap-2 lg:grid-cols-3'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className='p-1 border border-input/50 pb-2 sm:p-4 space-y-3 rounded'
        >
          <Skeleton className='w-full h-48 sm:h-72 bg-muted/60' />

          <div className='space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-10' />
            </div>
            <Skeleton className='h-8 w-full' />
          </div>
        </div>
      ))}
    </div>
  );
}
