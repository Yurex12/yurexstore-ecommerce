import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutSkeleton() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[60%_35%] gap-5 justify-between animate-pulse'>
      {/* Left section */}
      <div className='space-y-6'>
        {/* Address section */}
        <div className='border rounded-md p-4 space-y-4'>
          <Skeleton className='h-6 w-40' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        </div>

        {/* Order items */}
        <div className='border rounded-md p-4 space-y-4'>
          <Skeleton className='h-6 w-32' />
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton className='h-16 w-16 rounded-md' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-1/2' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right section (Order summary) */}
      <div className='border rounded-md p-4 space-y-4'>
        <Skeleton className='h-6 w-32' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>
        <Skeleton className='h-10 w-full rounded-md' />
      </div>
    </div>
  );
}
