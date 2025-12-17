import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpDown, Filter } from 'lucide-react';
import MobileFilterOptions from './MobileProductFilterOptions';
import MobileSortOptions from './MobileSortOption';

export default function MobileFilterSort() {
  return (
    <div className='fixed bottom-10 z-10 block w-full md:hidden'>
      <div className='mx-auto flex w-45 justify-between rounded-full  shadow-2xl bg-foreground/80 text-background'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer px-4 py-2 flex-1'>
              <span>Sort</span>
              <ArrowUpDown className='size-4' />
            </button>
          </SheetTrigger>

          <MobileSortOptions />
        </Sheet>

        <span className='mt-2'>|</span>

        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer px-4 py-2 flex-1'>
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
