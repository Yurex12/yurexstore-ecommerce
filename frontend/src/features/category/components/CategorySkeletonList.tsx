import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function CategorySkeletonList() {
  const skeletons = Array.from({ length: 4 });

  return (
    <div className='bg-muted/50 px-4 py-2 md:p-8 rounded'>
      <ScrollArea className='w-full rounded'>
        {/* Add bottom padding to create space for the scrollbar */}
        <div className='flex gap-4 min-w-max pb-4'>
          {skeletons.map((_, i) => (
            <div
              key={i}
              className='flex flex-col shrink-0 w-[30%] sm:w-[35%] md:w-[38%] lg:w-[24%] items-center justify-center gap-3 py-10 px-10 border bg-background rounded'
            >
              <div className='bg-primary/5 p-6 rounded-full'>
                <Skeleton className='h-12 w-12 rounded-full' />
              </div>

              <div className='text-center space-y-1'>
                <Skeleton className='h-4 w-24 mx-auto' />
                <Skeleton className='h-3 w-32 mx-auto' />
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
