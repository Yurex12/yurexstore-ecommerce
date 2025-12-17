import { Skeleton } from '@/components/ui/skeleton';

export default function ProductColorsSkeleton() {
  return (
    <div className='pb-4' aria-live='polite'>
      <div className='mb-2'>
        <Skeleton className='h-5 w-28 rounded-md' />
      </div>

      <ul className='mt-2 flex gap-x-3 items-center'>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className='p-1'>
            <Skeleton
              className='size-8 rounded-full'
              aria-hidden={false}
              aria-label={`loading color ${i + 1}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
