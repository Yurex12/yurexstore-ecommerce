import { Database, MenuIcon, Search, ShoppingCart } from 'lucide-react';

import { SheetTrigger } from '@/components/ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import AccountActions from './AccountActions';
import { useCart } from '@/features/cart/hooks/useCart';

export default function HeaderActions() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems =
    cart?.reduce((sum, cartItem) => cartItem.quantity + sum, 0) || 0;
  return (
    <div className='flex items-center space-x-5 text-2xl hover:cursor-pointer md:space-x-8'>
      <Link
        to='/admin'
        className='flex items-center justify-center gap-2 h-10 px-2 md:px-4 rounded-lg border border-foreground/70 hover:border-primary/50 bg-background hover:bg-accent transition-all duration-300 group'
        title='Admin Dashboard'
      >
        <Database className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors' />

        <span className='hidden md:inline text-sm group-hover:text-primary transition-colors'>
          Admin Dashboard
        </span>
      </Link>
      <AccountActions />
      <Link
        to={{ hash: 'search', search: location.search }}
        className='md:hidden'
      >
        <Search />
      </Link>
      <Link
        to='/cart'
        className='relative inline-flex items-center p-2 hover:bg-accent rounded-full transition-colors'
      >
        <ShoppingCart className='w-6 h-6 text-foreground' />

        {totalItems > 0 && (
          <span className='absolute top-0 right-0 flex h-5 w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-[10px] font-bold text-primary-foreground shadow-sm'>
            {totalItems}
          </span>
        )}
      </Link>

      {/* <SheetTrigger asChild>
        <MenuIcon className='lg:hidden' />
      </SheetTrigger> */}
    </div>
  );
}
