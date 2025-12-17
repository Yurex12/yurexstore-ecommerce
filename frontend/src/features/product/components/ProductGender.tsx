import { useSearchQuery } from '@/hooks/useSearchQuery';

import { Button } from '@/components/ui/button';

import { genders } from '../constants';

export default function ProductGender() {
  const { queryValue, handleSearchQuery } = useSearchQuery('gender', '');

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Gender</h3>
      <div className='mt-3 flex gap-x-2'>
        {genders.map((gender) => (
          <Button
            onClick={() => handleSearchQuery(gender)}
            key={gender}
            variant='outline'
            className={`rounded-lg px-4 capitalize hover:cursor-pointer hover:text-primary-foreground hover:bg-primary  ${
              gender === queryValue ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            {gender}
          </Button>
        ))}
      </div>
    </div>
  );
}
