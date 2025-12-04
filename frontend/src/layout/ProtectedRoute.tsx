import { Spinner } from '@/components/ui/spinner';
import useUser from '@/features/auth/hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  redirectTo?: string;
};

export default function ProtectedRoute({
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isPending } = useUser();

  if (isPending) return <Spinner />;

  if (!user) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
