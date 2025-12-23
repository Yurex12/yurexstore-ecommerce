import { Skeleton } from '@/components/ui/skeleton';

export default function MetricsListSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className='rounded-xl border p-4 bg-white'>
          <div className='mb-3 flex items-start justify-between'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />

              <Skeleton className='h-3 w-16' />
            </div>

            <Skeleton className='h-12 w-12 rounded-lg' />
          </div>

          <div className='mt-4 space-y-3'>
            <Skeleton className='h-10 w-32' />

            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-4 w-12' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
