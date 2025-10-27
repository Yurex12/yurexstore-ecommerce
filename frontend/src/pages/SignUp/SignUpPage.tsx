import { Link } from 'react-router-dom';

import Logo from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import SignUpForm from '@/features/auth/components/SignUpForm';
import SocialLogin from '@/features/auth/components/SocialLogin';

export default function SignUpPage() {
  return (
    <div className='flex h-svh flex-col items-center justify-center gap-6 p-4 md:p-10'>
      <div className='flex w-full max-w-md flex-col gap-y-6'>
        <Logo className='text-center uppercase text-2xl' />
        <Card className='shadow-none border border-input'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl md:text-2xl text-foreground/90'>
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SignUpForm />
            <SocialLogin />
            <div className='text-center text-sm text-foreground/70'>
              Already have an account?{' '}
              <Link to='/login' className='underline underline-offset-4'>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
