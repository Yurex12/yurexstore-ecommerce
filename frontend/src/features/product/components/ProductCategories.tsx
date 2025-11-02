import { useSearchQuery } from '@/hooks/useSearchQuery';

import { EmptyState } from '@/components/EmptyState';
import InlineError from '@/components/InlineError';

import useCategories from '@/features/category/hook/useCategories';
import ProductCategoriesSkeleton from './ProductCategoriesSkeleton';

export default function ProductCategories() {
  const { queryValue, handleSearchQuery } = useSearchQuery('category', '');

  const { categories, error, isPending } = useCategories();

  if (isPending) return <ProductCategoriesSkeleton />;

  if (error) {
    return <InlineError message='Unable to load categories.' />;
  }

  if (!categories?.length) {
    return <EmptyState message='No categories found.' />;
  }

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Categories</h3>
      <ul className='mt-2 space-y-3'>
        {categories.map((category) => (
          <li>
            <button
              className={`hover:cursor-pointer ${
                queryValue === category.id ? 'text-primary font-medium' : ''
              }`}
              onClick={() => handleSearchQuery(category.id)}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
