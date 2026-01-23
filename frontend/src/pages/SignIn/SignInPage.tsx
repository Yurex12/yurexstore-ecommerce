import { Link, Navigate } from 'react-router-dom';

import Logo from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import PageLoader from '@/components/PageLoader';
import SignInForm from '@/features/auth/components/SignInForm';
import SocialLogin from '@/features/auth/components/SocialLogin';
import useUser from '@/features/auth/hooks/useUser';

export default function SignInPage() {
  const { isPending, isAuthenticated, error } = useUser();

  if (isPending) return <PageLoader className='md:h-dvh' />;

  if (isAuthenticated && !error) return <Navigate to='/' replace />;

  return (
    <div className='flex h-svh flex-col items-center justify-center gap-6 p-4 md:p-10'>
      <div className='flex w-full max-w-md flex-col gap-y-6'>
        <Logo className='mx-auto' />
        <Card className='shadow-none border border-input'>
          <CardHeader className='text-center'>
            <CardTitle className='text-lg md:text-2xl text-foreground/90'>
              Login to your account
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SignInForm />
            <SocialLogin />
            <div className='text-center text-sm text-foreground/70'>
              Don&apos;t have an account?{' '}
              <Link to='/register' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
