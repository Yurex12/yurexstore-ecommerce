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

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

const navMain = [
  {
    title: 'Overview',
    path: '/admin/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: ShoppingBag,
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: Tag,
  },
  {
    title: 'Colors',
    path: '/admin/colors',
    icon: Palette,
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: Package,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: Users,
  },
];

export default function AdminSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { pathname } = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <NavLink to='/admin/overview'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <LayoutDashboard className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>Yurexstore</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 ${
                          isActive ? 'text-primary font-medium' : ''
                        }`
                      }
                    >
                      <Icon className='size-4' />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}

            {/* Logout */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  type='button'
                  onClick={() => console.log('logout')}
                  className='flex w-full items-center gap-3 text-sm font-medium text-destructive'
                >
                  <LogOut className='size-4' />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
