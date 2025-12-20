import InlineError from '@/components/InlineError';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import EmptyState from '@/components/EmptyState';
import { useCategories } from '../hook/useCategories';
import CategoryCard from './CategoryCard';
import CategorySkeletonList from './CategorySkeletonList';

export default function CategoriesList() {
  const { categories, isPending, error } = useCategories();

  if (isPending) return <CategorySkeletonList />;
  if (error) return <InlineError message='Unable to load categories' />;
  if (!categories?.length) return <EmptyState message='No categories found' />;

  return (
    <div className='bg-muted/50 px-4 py-2 md:p-8 rounded'>
      <ScrollArea className='w-full rounded'>
        <div className='flex gap-4 min-w-max pb-4'>
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
