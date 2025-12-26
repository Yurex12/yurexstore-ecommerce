import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MobileProductsSearchResults from './MobileProductsSearchResults';
import { Separator } from '@/components/ui/separator';

export default function MobileProductsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [debounced] = useDebounce(value, 500);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchInputRef) searchInputRef.current?.focus();
  }, []);

  const { products, isPending, error } = useSearchProducts(debounced);

  function clearSearchInput() {
    setValue('');
    searchParams.delete('q');
    setSearchParams(searchParams);
  }

  function submitSearch() {
    if (!value.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(value.trim())}`);
  }
  return (
    <div className='w-full h-svh fixed top-0 left-0  py-4 px-2 bg-background flex flex-col'>
      <div className='flex items-center gap-2 mb-4'>
        <button
          onClick={() => navigate('/shop')}
          className='p-2 text-gray-700 hover:text-gray-900'
        >
          <ArrowLeft className='size-6' />
        </button>

        <div className='relative flex-1'>
          <Input
            ref={searchInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
            placeholder='Search products...'
            className='pl-4 pr-24 py-5 shadow-none placeholder:text-sm'
          />

          {value && (
            <button
              onClick={clearSearchInput}
              className='absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='size-5' />
            </button>
          )}

          <button
            onClick={submitSearch}
            disabled={value.length < 1}
            className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed'
          >
            <Search className='h-5 w-5' />
          </button>
        </div>
      </div>

      <Separator />

      {value.length >= 1 && (
        <MobileProductsSearchResults
          products={products}
          isPending={isPending}
          error={error}
          onClearInput={clearSearchInput}
        />
      )}
    </div>
  );
}
