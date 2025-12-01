import { Skeleton } from '@/components/ui/skeleton';

export function PendingReviewsSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className='p-4 border rounded-lg bg-background flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'
        >
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <Skeleton className='w-20 h-20 rounded-md' />

            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-40' />

              <Skeleton className='h-3 w-28' />
            </div>
          </div>

          <div className='flex gap-2 justify-end mt-3 sm:mt-0 w-full sm:w-auto'>
            <Skeleton className='h-9 w-28 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
