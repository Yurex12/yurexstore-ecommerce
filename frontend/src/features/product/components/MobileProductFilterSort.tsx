import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpDown, Filter } from 'lucide-react';
import MobileFilterOptions from './MobileProductFilterOptions';
import MobileSortOptions from './MobileSortOption';

export default function MobileFilterSort() {
  return (
    <div className='fixed bottom-10 z-10 block w-full md:hidden'>
      <div className='mx-auto flex w-45 justify-between rounded-full  px-4 py-1 shadow-2xl bg-background text-secondary-foreground border border-primary/40'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer text-primary'>
              <span>Sort</span>
              <ArrowUpDown className='size-4' />
            </button>
          </SheetTrigger>

          <MobileSortOptions />
        </Sheet>

        <span className='text-primary'>|</span>

        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer text-primary'>
              <span> Filter</span>
              <Filter className='size-4' />
            </button>
          </SheetTrigger>

          <MobileFilterOptions />
        </Sheet>
      </div>
    </div>
  );
}
