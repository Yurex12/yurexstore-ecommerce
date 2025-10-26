import { Spinner } from '@/components/ui/spinner';
import useCategories from '@/features/category/hook/useCategories';
import { useSearchQuery } from '@/hooks/useSearchQuery';

export default function ProductCategories() {
  const { queryValue, handleSearchQuery } = useSearchQuery('category', '');

  const { categories, error, isPending } = useCategories();

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
