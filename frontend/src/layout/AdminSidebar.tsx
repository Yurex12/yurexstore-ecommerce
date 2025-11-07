import {
  LayoutDashboard,
  LogOut,
  Package,
  Palette,
  ShoppingBag,
  Tag,
  Users,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const links = [
    {
      name: 'Overview',
      path: '/admin/overview',
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <ShoppingBag size={18} />,
    },
    { name: 'Categories', path: '/admin/categories', icon: <Tag size={18} /> },
    { name: 'Colors', path: '/admin/colors', icon: <Palette size={18} /> },
    { name: 'Orders', path: '/admin/orders', icon: <Package size={18} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={18} /> },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/admin/overview') return pathname === '/admin/overview';
    return pathname.startsWith(path);
  };

  return (
    <aside className='hidden h-full w-64 flex-col justify-between rounded-sm bg-muted/50 p-4 md:flex'>
      {/* Header */}
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-foreground'>Admin Panel</h2>

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
