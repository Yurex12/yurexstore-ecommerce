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
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar2';

export default function AdminLayout() {
  const { pathname } = useLocation();
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
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
        </header>
        <main className='p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
