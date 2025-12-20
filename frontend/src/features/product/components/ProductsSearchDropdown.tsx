import { useNavigate } from 'react-router-dom';
import type { SearchDropdownProps } from '../types';

import { Spinner } from '@/components/ui/spinner';

export function ProductsSearchDropdown({
  products,
  isPending,
  onClearInput,
  error,
}: SearchDropdownProps) {
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className='absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-md border bg-white shadow-lg'>
        <div className='flex items-center justify-center py-4'>
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-md border bg-white shadow-lg'>
        <div className='px-4 py-3 text-sm text-red-500'>
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }
  if (!products || products?.length === 0) {
    return (
      <div className='absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-md border bg-white shadow-lg'>
        <div className='px-4 py-3 text-sm text-gray-500'>
          <p>No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-md border bg-white shadow-lg'>
      <ul className='max-h-64 overflow-y-auto'>
        {products.map((product) => (
          <li
            key={product.id}
            className='cursor-pointer px-4 py-3 text-sm hover:bg-gray-100 border-b'
            onClick={() => {
              onClearInput();
              navigate(`/shop/${product.id}`);
            }}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
