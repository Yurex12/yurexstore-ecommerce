import { useState } from 'react';

import { Database, Search, ShoppingCart } from 'lucide-react';

import useUser from '@/features/auth/hooks/useUser';
import { useCart } from '@/features/cart/hooks/useCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountActions from './AccountActions';
import AdminLoginDialog from '@/features/auth/components/AdminLoginDialog';

export default function HeaderActions() {
  const { cart } = useCart();
  const location = useLocation();

  const { user } = useUser();

  const navigate = useNavigate();

  const [openAdminLoginDialog, setOpenAdminLoginDialog] = useState(false);

  const totalItems =
    cart?.reduce((sum, cartItem) => cartItem.quantity + sum, 0) || 0;
  return (
    <div className='flex items-center space-x-5 text-2xl hover:cursor-pointer md:space-x-8'>
      {user && (
        <button
          onClick={() => {
            if (user.role !== 'ADMIN') setOpenAdminLoginDialog(true);
            else navigate('/admin');
          }}
          className='px-4 py-2 border border-foreground/50 flex items-center gap-2 rounded-md cursor-pointer'
        >
          <Database className='w-5 h-5' />

          <span className='hidden md:inline text-sm'>Admin Dashboard</span>
        </button>
      )}
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

      <AdminLoginDialog
        open={openAdminLoginDialog}
        setOpen={setOpenAdminLoginDialog}
      />
    </div>
  );
}
