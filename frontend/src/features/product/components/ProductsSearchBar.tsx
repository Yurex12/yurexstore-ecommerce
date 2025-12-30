import { useEffect, useRef, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { ProductsSearchDropdown } from './ProductsSearchDropdown';

export default function ProductsSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [debounced] = useDebounce(value, 500);

  const navigate = useNavigate();

  const { products, isPending, error } = useSearchProducts(debounced);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function clearSearchInput() {
    setValue('');
    setShowDropdown(false);
    searchParams.delete('q');
    setSearchParams(searchParams);
  }

  function submitSearch() {
    if (!value.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(value.trim())}`);
    setShowDropdown(false);
  }

  function handleClickOutside(e: MouseEvent) {
    if (searchRef.current && !searchRef.current.contains(e.target as Node))
      setShowDropdown(false);
  }

  return (
    <div className='relative md:w-80 lg:w-md hidden md:block' ref={searchRef}>
      <div className='relative'>
        <Input
          value={value}
          onChange={(e) => {
            setShowDropdown(e.target.value.length > 0);
            setValue(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
          onFocus={() => {
            if (!showDropdown && value.length >= 1) setShowDropdown(true);
          }}
          placeholder='Search products...'
          className='pr-20 pl-4 py-5 shadow-none placeholder:text-sm'
        />

        {/* Clear */}
        {value && (
          <button
            type='button'
            onClick={clearSearchInput}
            className='absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            <X className='size-5' />
          </button>
        )}

        {/* Search submit */}
        <button
          type='button'
          onClick={submitSearch}
          disabled={value.length < 1}
          className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-150'
        >
          <Search className='h-5 w-5' />
        </button>
      </div>

      {showDropdown && (
        <ProductsSearchDropdown
          onClearInput={clearSearchInput}
          products={products}
          isPending={isPending}
          error={error}
        />
      )}
    </div>
  );
}
