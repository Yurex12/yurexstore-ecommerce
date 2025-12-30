import { useMemo, useState } from 'react';

import { Database, LogIn, Search, ShoppingCart } from 'lucide-react';

import useUser from '@/features/auth/hooks/useUser';
import { useCart } from '@/features/cart/hooks/useCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountActions from './AccountActions';
import AdminLoginDialog from '@/features/auth/components/AdminLoginDialog';
import { Button } from '@/components/ui/button';

export default function HeaderActions() {
  const { cart } = useCart();
  const location = useLocation();
  const { user, isPending, isAuthenticated, error } = useUser();
  const navigate = useNavigate();
  const [openAdminLoginDialog, setOpenAdminLoginDialog] = useState(false);

  const totalItems = useMemo(
    () => cart?.reduce((sum, cartItem) => cartItem.quantity + sum, 0) || 0,
    [cart]
  );

  function handleAdminClick() {
    if (user?.role !== 'ADMIN') setOpenAdminLoginDialog(true);
    else navigate('/admin');
  }

  if (isPending) {
    return (
      <div className='flex items-center gap-4'>
        <div className='h-9 w-24 animate-pulse rounded-md bg-muted' />
        <div className='hidden md:block h-9 w-24 animate-pulse rounded-md bg-muted' />
        <div className='h-9 w-9 animate-pulse rounded-full bg-muted' />
      </div>
    );
  }

  if (error || !isAuthenticated) {
    return (
      <div className='flex items-center space-x-5 md:space-x-8'>
        <Link
          to={{ hash: 'search', search: location.search }}
          className='md:hidden'
        >
          <Search className='w-6 h-6' />
        </Link>

        <Button
          className='flex items-center gap-2'
          onClick={() => navigate('/login')}
        >
          <LogIn size={18} />
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center space-x-5 text-2xl '>
      <button
        onClick={handleAdminClick}
        className='px-4 py-2 border border-foreground/50 flex items-center gap-2 rounded-md cursor-pointer hover:bg-accent transition-colors'
      >
        <Database className='w-5 h-5' />
        <span className='hidden lg:inline text-sm'>Dashboard</span>
      </button>

      <AccountActions />

      <Link
        to={{ hash: 'search', search: location.search }}
        className='md:hidden'
      >
        <Search />
      </Link>

      <Link
        to='/cart'
        className='relative p-2 transition-colors hover:bg-accent rounded-full'
      >
        <ShoppingCart className='size-6 text-foreground' />

        {totalItems > 0 && (
          <span className='absolute top-1 right-1 flex h-5 w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm'>
            {totalItems}
          </span>
        )}
      </Link>

      <AdminLoginDialog
        open={openAdminLoginDialog}
        setOpen={setOpenAdminLoginDialog}
      />
    </div>
  );
}
