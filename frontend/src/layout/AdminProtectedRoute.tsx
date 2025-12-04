import { Spinner } from '@/components/ui/spinner';
import useUser from '@/features/auth/hooks/useUser';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function AdminProtectedRoute({
  children,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isPending } = useUser();

  if (isPending) return <Spinner />;

  if (!user) return <Navigate to={redirectTo} replace />;

  if (user.role !== 'ADMIN') return <Navigate to='/' replace />;

  return <>{children}</>;
}
