import { Skeleton } from '@/components/ui/skeleton';

export default function OrderDetailsSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='space-y-3'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className='h-px w-full' />
      </div>

      {/* Order Info */}
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-40' />
        </div>
        <Skeleton className='h-6 w-24 rounded-full' />
      </div>

      {/* Order Items */}
      <div className='space-y-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-4 border rounded-lg p-3 bg-background'
          >
            <Skeleton className='size-16 rounded-md' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-3 w-24' />
            </div>
            <Skeleton className='h-4 w-16' />
          </div>
        ))}
      </div>

      {/* Payment + Delivery Info */}
      <div className='flex flex-col md:flex-row gap-4'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className='flex-1 space-y-3 border rounded-xl p-4'>
            <Skeleton className='h-4 w-32' />
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className='h-3 w-40' />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
