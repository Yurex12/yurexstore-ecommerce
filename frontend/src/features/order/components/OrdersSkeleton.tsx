import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersSkeleton() {
  return (
    <ul className='space-y-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='border rounded-xl p-5 space-y-4'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-24' />
            </div>
            <Skeleton className='h-6 w-20 rounded-full' />
          </div>

          {/* Items */}
          <div className='space-y-3'>
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className='flex items-center gap-3'>
                <Skeleton className='h-12 w-12 rounded-md' />
                <div className='space-y-2'>
                  <Skeleton className='h-3 w-32' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between border-t pt-4'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-8 w-20' />
          </div>
        </div>
      ))}
    </ul>
  );
}
