import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCategoriesSkeleton() {
  return (
    <div className='pb-4'>
      <Skeleton className='h-5 w-32 mb-4' />
      <ul className='space-y-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i}>
            <Skeleton className='h-4 w-24' />
          </li>
        ))}
      </ul>
    </div>
  );
}
