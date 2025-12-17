import { Skeleton } from '@/components/ui/skeleton';

export default function WishlistItemsSkeleton() {
  return (
    <div className='space-y-4'>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className='p-4 border rounded-md bg-background sm:flex sm:items-center sm:justify-between space-y-3 animate-in fade-in'
        >
          <div className='flex gap-4 items-center'>
            <Skeleton className='w-20 h-20 rounded-md' />
            <div className='space-y-2'>
              <Skeleton className='h-5 w-40' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>

          <div className='flex gap-2 items-center justify-end'>
            <Skeleton className='h-9 w-24 rounded-md' />
            <Skeleton className='h-9 w-28 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
