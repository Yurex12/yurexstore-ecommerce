import { MenuIcon, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import AccountActions from './AccountActions';

export default function HeaderActions() {
  return (
    <div className='flex items-center space-x-4 text-2xl hover:cursor-pointer md:space-x-10'>
      <Link to='/cart'>
        <ShoppingCart />
      </Link>

      <AccountActions />

      <div className='hidden md:block'>
        <Button className='w-fit rounded-lg bg-primary px-6 text-white hover:bg-primary/90'>
          Logout
        </Button>
      </div>

      <SheetTrigger asChild>
        <MenuIcon className='text-gray-600 lg:hidden' />
      </SheetTrigger>
    </div>
  );
}
