import { Skeleton } from '@/components/ui/skeleton';

export function ReviewsSkeleton() {
  return (
    <div className='space-y-4 mt-6'>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className='p-4 border rounded-lg bg-background flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'
        >
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <Skeleton className='w-10 h-10 rounded-full' />

            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>

          <div className='flex gap-2 justify-end mt-3 sm:mt-0 w-full sm:w-auto'>
            <Skeleton className='h-9 w-20 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
