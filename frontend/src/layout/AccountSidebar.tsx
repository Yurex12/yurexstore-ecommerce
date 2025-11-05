import { Separator } from '@/components/ui/separator';
import { Heart, Home, Key, LogOut, MapPin, Package, Star } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function AccountSidebar() {
  const { pathname } = useLocation();

  const links = [
    { name: 'Overview', path: '/account', icon: <Home size={18} /> },
    { name: 'Orders', path: '/account/orders', icon: <Package size={18} /> },
    { name: 'Wishlist', path: '/account/wishlist', icon: <Heart size={18} /> },
    {
      name: 'Pending Reviews',
      path: '/account/reviews',
      icon: <Star size={18} />,
    },
  ];

  const accountManagementLinks = [
    {
      name: 'Update Password',
      path: '/account/update-password',
      icon: <Key size={16} />,
    },
    {
      name: 'Address Book',
      path: '/account/addresses',
      icon: <MapPin size={16} />,
    },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/account') return pathname === '/account'; // exact match
    return pathname.startsWith(path);
  };

  return (
    <aside className='hidden h-full flex-col justify-between rounded-sm bg-muted/50 p-4 md:flex w-64'>
      {/* Header */}
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-foreground'>My Account</h2>

        {/* Main navigation */}
        <nav className='space-y-4'>
          <ul className='space-y-1'>
            {links.map((link) => {
              const active = isActiveLink(link.path);
              return (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <Separator />

          {/* Account Management */}
          <div className='space-y-1'>
            <h4 className='px-3 text-xs font-semibold uppercase'>
              Account Management
            </h4>
            <ul className='space-y-1'>
              {accountManagementLinks.map((link) => {
                const active = isActiveLink(link.path);
                return (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => console.log('logout')}
        className='mt-6 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors'
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
