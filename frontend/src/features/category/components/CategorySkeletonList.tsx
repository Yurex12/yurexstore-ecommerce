import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import CategoryCardSkeleton from './CategoryCardSkeleton';

export default function CategorySkeletonList() {
  return (
    <ScrollArea className='w-full whitespace-nowrap rounded'>
      <div className='flex bg-muted/50 gap-4 p-4 md:p-8'>
        {Array.from({ length: 4 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
