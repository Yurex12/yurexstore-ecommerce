import { type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ShieldAlert } from 'lucide-react';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

export default function AdminLoginDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { signIn, isPending } = useSignIn();
  const navigate = useNavigate();

  function handleLogin() {
    signIn(
      { email: 'yusuf2@gmail.com', password: 'Adeyemi@17' },
      {
        onSuccess() {
          navigate('/admin');
        },
      }
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className='flex flex-col items-center text-center'>
          <div className='size-16 rounded-full bg-primary/10 flex items-center justify-center'>
            <ShieldAlert className='size-8 text-primary' />
          </div>
          <DialogTitle className='text-2xl font-bold tracking-tight'>
            Admin Access Required
          </DialogTitle>
          <DialogDescription className='text-base text-muted-foreground'>
            To view this dashboard, you need to be signed in as an admin. Click
            the button below to continue.
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-end'>
          <Button
            className='px-6 w-35'
            disabled={isPending}
            onClick={handleLogin}
          >
            {isPending ? <Spinner /> : <span>Login as Admin</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
