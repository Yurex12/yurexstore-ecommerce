import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useColors } from '@/features/color/hooks/useColors';
import ProductColorsSkeleton from './ProductColorsSkeleton';
import InlineError from '@/components/InlineError';
import EmptyState from '@/components/EmptyState';

export default function ProductColors() {
  const { queryValue, handleSearchQuery } = useSearchQuery('color', '');
  const { colors, isPending, error } = useColors();

  if (isPending) return <ProductColorsSkeleton />;
  if (error) return <InlineError message='Failed to fetch colors' />;
  if (!colors?.length) return <EmptyState />;

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Colors</h3>
      <ul className='mt-2 flex gap-x-4'>
        {colors.map((color) => (
          <li key={color.name} onClick={() => handleSearchQuery(color.name)}>
            <div
              className={`size-7 rounded-full border shadow-sm hover:cursor-pointer ${
                color.name === queryValue ? 'ring-2 ring-offset-2' : ''
              }`}
              style={
                color.name === queryValue
                  ? {
                      backgroundColor: color.code,
                      ['--tw-ring-color' as string]: color.code,
                    }
                  : {
                      backgroundColor: color.code,
                    }
              }
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
