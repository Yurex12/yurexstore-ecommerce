import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

interface MobileProductsSearchResultsProps {
  products?: { id: string; name: string }[];
  isPending: boolean;
  error: unknown;
  onClearInput: () => void;
}

export default function MobileProductsSearchResults({
  products,
  isPending,
  error,
  onClearInput,
}: MobileProductsSearchResultsProps) {
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className='flex items-center justify-center py-4'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='px-4 py-3 text-sm text-red-500 text-center'>
        Something went wrong
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='px-4 py-3 text-sm text-gray-500 text-center'>
        No results found
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      <ul className='divide-y'>
        {products.map((product) => (
          <li
            key={product.id}
            className='cursor-pointer px-4 py-3 text-sm hover:bg-gray-100'
            onClick={() => {
              onClearInput();
              navigate(`/shop/${product.id}`, { replace: true });
            }}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
