import { Skeleton } from '@/components/ui/skeleton';

export default function CartLoadingSkeleton() {
  const skeletons = Array.from({ length: 3 });

  return (
    <div className='space-y-4'>
      {/* Heading */}
      <Skeleton className='h-6 w-48 rounded' />

      <div className='space-y-6'>
        {skeletons.map((_, idx) => (
          <div key={idx} className='py-4 border-b space-y-4 flex flex-col'>
            {/* Top: Image + Name + Badge + Price */}
            <div className='flex gap-4'>
              <Skeleton className='size-20 rounded' />
              <div className='flex-1 flex flex-col sm:flex-row sm:justify-between gap-2 min-w-0'>
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-32 rounded' />
                  <Skeleton className='h-4 w-16 rounded' />
                </div>
                <Skeleton className='h-4 w-16 rounded' />
              </div>
            </div>

            {/* Bottom: Remove + Quantity Controls */}
            <div className='flex justify-between items-center'>
              <Skeleton className='h-6 w-20 rounded' />
              <div className='flex items-center gap-x-4'>
                <Skeleton className='h-6 w-6 rounded-full' />
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
