import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useColors } from '@/features/color/hooks/useColors';
import ProductColorsSkeleton from './ProductColorsSkeleton';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ProductColors() {
  const { queryValue, handleSearchQuery } = useSearchQuery('color', '');
  const { colors, isPending, error } = useColors();

  if (isPending) return <ProductColorsSkeleton />;
  if (error) return <ErrorState message='Failed to fetch colors' />;
  if (!colors?.length) return <EmptyState />;

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Colors</h3>
      <ul className='mt-2 flex gap-4 flex-wrap'>
        {colors.map((color) => (
          <li key={color.name} onClick={() => handleSearchQuery(color.name)}>
            <Tooltip>
              <TooltipTrigger>
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
              </TooltipTrigger>
              <TooltipContent>
                <p className='capitalize'>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}
