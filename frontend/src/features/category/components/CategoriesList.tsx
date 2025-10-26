import useCategories from '../hook/useCategories';

import { Spinner } from '@/components/ui/spinner';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import CategoryCard from './CategoryCard';

export default function CategoriesList() {
  const { categories, isPending, error } = useCategories();

  if (isPending) {
    return (
      <div className='flex items-center gap-4'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!categories?.length) {
    return <p>No categories found</p>;
  }
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
