import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function ProductsSearchQueryBadge() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  return (
    <div>
      {q && (
        <div className='mt-2 flex items-center gap-2'>
          <span className='inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600'>
            Showing results for{' '}
            <strong className='font-medium text-gray-800 break-all'>
              “{q}”
            </strong>
            <button
              type='button'
              onClick={() => {
                searchParams.delete('q');
                setSearchParams(searchParams);
              }}
              className='ml-1 text-gray-400 hover:text-gray-600'
              aria-label='Clear search'
            >
              <X className='size-4' />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
