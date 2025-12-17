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
    <ScrollArea className='w-full whitespace-nowrap rounded'>
      <div className='flex bg-muted/50 gap-4 p-4 md:p-8'>
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
