import { useSearchQuery } from '@/hooks/useSearchQuery';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { sortOptions } from '../constants';

export default function ProductSort() {
  const { queryValue, handleSearchQuery } = useSearchQuery(
    'sort',
    sortOptions[0].id
  );
  return (
    <div className='hidden items-center gap-2 md:flex'>
      <Select
        name='sort'
        value={queryValue}
        onValueChange={(value) => handleSearchQuery(value)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {sortOptions.map((sortOption) => (
              <SelectItem value={sortOption.id}>{sortOption.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
