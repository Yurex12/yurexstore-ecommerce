import Logo from '@/components/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import useSignOut from '@/features/auth/hooks/useSignOut';
import {
  LayoutDashboard,
  LogOut,
  Package,
  Palette,
  ShoppingBag,
  Tag,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

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
  const { signOut, isPending } = useSignOut();
  const { isMobile, setOpenMobile } = useSidebar();

  function handleClose() {
    if (isMobile) setOpenMobile(false);
  }

  return (
    <Sidebar {...props} className='border-r'>
      <SidebarHeader className='px-6 py-4 border-b'>
        <Logo />
      </SidebarHeader>

      <SidebarContent className='px-3'>
        <SidebarGroup>
          <SidebarMenu className='gap-1'>
            {navMain.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setTimeout(handleClose, 50)}
                    className={({ isActive }) =>
                      `flex items-center h-11 px-3 gap-3 rounded transition-all duration-200 border-l-4 ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground border-transparent'
                      }`
                    }
                  >
                    <Icon className='h-[18px] w-[18px]' />
                    <span className='text-[15px]'>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t px-3 py-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={() => signOut()}
              className='flex items-center w-full h-11 px-3 gap-3 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200'
              disabled={isPending}
            >
              <LogOut className='h-[18px] w-[18px]' />
              <span className='text-[15px] font-medium'>Logout</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
