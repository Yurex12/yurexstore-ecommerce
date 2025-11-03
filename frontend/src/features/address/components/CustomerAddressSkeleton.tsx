import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerAddressSkeleton() {
  return (
    <div className='border px-4 py-2 rounded-md space-y-3 animate-pulse'>
      <div className='flex justify-between items-center'>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-5 w-16' />
      </div>

      <Skeleton className='h-px w-full' />

      <div className='space-y-2'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </div>
    </div>
  );
}
