import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryCardSkeleton() {
  return (
    <div className='flex flex-col shrink-0 w-[30%] sm:w-[35%] md:w-[38%] lg:w-[24%] flex-1 items-center justify-center gap-3 py-10 px-10  border bg-background rounded'>
      <div className='bg-primary/5 p-6 rounded-full'>
        <Skeleton className='h-12 w-12 rounded-full' />
      </div>

      <div className='text-center space-y-1'>
        <Skeleton className='h-4 w-24 mx-auto' />
        <Skeleton className='h-3 w-32 mx-auto' />
      </div>
    </div>
  );
}
