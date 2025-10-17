import { Button } from '@/components/ui/button';

export default function GoogleLoginButton() {
  return (
    <Button variant='outline' className='w-full'>
      <img src='google.svg' alt='google' />
      Login with Google
    </Button>
  );
}
