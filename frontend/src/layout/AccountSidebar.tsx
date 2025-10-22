import { NavLink } from 'react-router-dom';
import { LogOut, Package, Star, Settings, Home, Heart } from 'lucide-react';

export default function AccountSidebar() {
  const links = [
    { name: 'Overview', path: '/account', icon: <Home size={18} /> },
    { name: 'Orders', path: '/account/orders', icon: <Package size={18} /> },
    { name: 'Wishlist', path: '/account/wishlist', icon: <Heart size={18} /> },
    {
      name: 'Pending Reviews',
      path: '/account/reviews',
      icon: <Star size={18} />,
    },
    {
      name: 'Settings',
      path: '/account/settings',
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside className='flex h-full flex-col justify-between rounded-sm bg-muted/50 p-4'>
      {/* Header */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground'>My Account</h2>

        {/* Navigation */}
        <nav>
          <ul className='space-y-1'>
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  end
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
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
