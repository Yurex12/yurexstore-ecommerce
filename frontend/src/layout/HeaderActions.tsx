import { MenuIcon, Search, ShoppingCart } from 'lucide-react';

import { SheetTrigger } from '@/components/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import AccountActions from './AccountActions';

export default function HeaderActions() {
  const location = useLocation();
  return (
    <div className='flex items-center space-x-5 text-2xl hover:cursor-pointer md:space-x-8'>
      <Link
        to={{ hash: 'search', search: location.search }}
        className='md:hidden'
      >
        <Search />
      </Link>
      <AccountActions />

      <Link to='/cart'>
        <ShoppingCart />
      </Link>

      {/* <SheetTrigger asChild>
        <MenuIcon className='lg:hidden' />
      </SheetTrigger> */}
    </div>
  );
}
