import { MenuIcon, ShoppingCart } from 'lucide-react';

import { SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import AccountActions from './AccountActions';

export default function HeaderActions() {
  return (
    <div className='flex items-center space-x-5 text-2xl hover:cursor-pointer md:space-x-8'>
      <Link to='/cart'>
        <ShoppingCart />
      </Link>

      <AccountActions />

      <SheetTrigger asChild>
        <MenuIcon className='lg:hidden' />
      </SheetTrigger>
    </div>
  );
}
