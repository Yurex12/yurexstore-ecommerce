import AuthSpinner from '@/components/AuthSpinner';
import useUser from '@/features/auth/hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  redirectTo?: string;
};

export default function ProtectedRoute({
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, isPending } = useUser();

  if (isPending) return <AuthSpinner />;

  if (!user) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
