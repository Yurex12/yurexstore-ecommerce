import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar2';
import AdminAvatar from './AdminAvatar';
import { LucideShoppingBag } from 'lucide-react';

export default function AdminLayout() {
  const { pathname } = useLocation();
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className='flex bg-white z-50 h-16 top-0 w-full sticky shrink-0 items-center gap-2 border-b justify-between pr-4'>
          <div className='flex items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {pathname
                  .split('/')
                  .filter(Boolean)
                  .map((segment, index, array) => {
                    if (segment === 'admin') return;
                    const isLast = index === array.length - 1;
                    const href = '/' + array.slice(0, index + 1).join('/');
                    const label =
                      segment.charAt(0).toUpperCase() + segment.slice(1);

                    return (
                      <>
                        <BreadcrumbItem key={href}>
                          {isLast ? (
                            <BreadcrumbPage className='font-semibold'>
                              {label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator key={`sep-${index}`} />
                        )}
                      </>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex gap-6 items-center justify-center'>
            <Link
              to='/shop'
              className='flex items-center justify-center gap-2 h-10 px-2 md:px-4 rounded-lg border border-foreground/70 hover:border-primary/50 bg-background hover:bg-accent transition-all duration-300 group'
              title='Admin Dashboard'
            >
              <LucideShoppingBag className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors' />

              <span className='hidden md:inline text-sm group-hover:text-primary transition-colors'>
                View Shop
              </span>
            </Link>
            <AdminAvatar />
          </div>
        </header>
        <main className='p-4 '>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
