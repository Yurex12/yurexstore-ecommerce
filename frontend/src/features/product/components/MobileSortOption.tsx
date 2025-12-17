import { SheetClose, SheetContent } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { sortOptions } from '../constants';
import { useSearchQuery } from '@/hooks/useSearchQuery';

export default function MobileSortOptions() {
  const { queryValue, handleSearchQuery } = useSearchQuery(
    'sort',
    sortOptions[0].id
  );
  return (
    <SheetContent side='bottom'>
      {/* close Icon */}
      <div className='flex justify-between border-b py-2 px-4'>
        <h3 className='text-lg'>Sort by :</h3>
        <SheetClose asChild>
          <X className='text-2xl' />
        </SheetClose>
      </div>

      {/* items */}
      <div className='sort-options space-y-4 px-4 pb-4'>
        {sortOptions.map((option) => (
          <div>
            <input
              type='radio'
              className='hidden'
              id={option.id}
              value={option.id}
              onChange={(e) => handleSearchQuery(e.target.value)}
              checked={queryValue === option.id}
              name='sort-options'
            />
            <label htmlFor={option.id} className='flex justify-between'>
              <span>{option.name}</span>
              <span className='icon block size-4 rounded-full border border-primary'></span>
            </label>
          </div>
        ))}
      </div>
    </SheetContent>
  );
}
