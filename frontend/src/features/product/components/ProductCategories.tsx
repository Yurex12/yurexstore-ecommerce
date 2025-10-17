import { useSearchQuery } from '@/hooks/useSearchQuery';

import { categories } from '../constants';

export default function ProductCategories() {
  const { queryValue, handleSearchQuery } = useSearchQuery('category', '');

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Categories</h3>
      <ul className='mt-2 space-y-3'>
        {categories.map((category) => (
          <li
            className={`hover:cursor-pointer ${
              queryValue === category.id ? 'text-primary font-medium' : ''
            }`}
            onClick={() => handleSearchQuery(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
