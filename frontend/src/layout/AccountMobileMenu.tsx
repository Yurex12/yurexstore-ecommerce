import { Skeleton } from '@/components/ui/skeleton';
import useSignOut from '@/features/auth/hooks/useSignOut';
import useUser from '@/features/auth/hooks/useUser';
import {
  ChevronRight,
  Heart,
  Home,
  Key,
  LogOut,
  MapPin,
  Package,
  Star,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'Overview', path: '/account', icon: <Home size={18} /> },
  { name: 'Orders', path: '/account/orders', icon: <Package size={18} /> },
  { name: 'Wishlist', path: '/account/wishlist', icon: <Heart size={18} /> },
  {
    name: 'Pending Reviews',
    path: '/account/pending-reviews',
    icon: <Star size={18} />,
  },

  {
    name: 'Update Password',
    path: '/account/update-password',
    icon: <Key size={18} />,
  },
  {
    name: 'Address Book',
    path: '/account/addresses',
    icon: <MapPin size={18} />,
  },
];

export default function AccountMobileMenu() {
  const { user } = useUser();

  const { signOut, isPending } = useSignOut();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className='space-y-6'>
      <div className='bg-primary/5 p-2 rounded-sm'>
        <h2 className='text-lg font-bold'>Welcome, Yusuf 👋</h2>
        <p className='text-sm text-muted-foreground'>
          ekungomiadeyemi@gmail.com
        </p>
      </div>

      <nav>
        <ul className='space-y-3'>
          {menuItems.map((item) => {
            if (item.path === '/account/update-password') {
              if (!user) {
                return (
                  <li
                    key={item.name}
                    className='h-4 w-full rounded-md bg-muted'
                  >
                    <Skeleton className='h-8 w-2/3 rounded-md' />
                  </li>
                );
              }
              if (user.signUpMethod === 'SOCIAL') return null;
            }
            return (
              <li
                key={item.name}
                className='text-sm font-medium rounded-md bg-muted'
              >
                <Link
                  to={item.path}
                  className='flex items-center justify-between gap-x-4 p-3 w-full'
                >
                  <div className='gap-x-3 flex items-center'>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>

                  <ChevronRight />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={() => signOut()}
        className='flex items-center gap-3 p-3 text-sm font-medium text-red-600 bg-red-600/10 rounded-md'
        disabled={isPending}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
