import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LockKeyhole } from 'lucide-react';

export default function AdminLoginDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className='sm:max-w-[400px] p-8 border-border bg-background shadow-xl'>
        <DialogHeader className='flex flex-col items-center text-center'>
          <div className='mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center'>
            <LockKeyhole className='h-6 w-6 text-foreground' />
          </div>

          <DialogTitle className='text-xl font-bold tracking-tight'>
            Admin Access Required
          </DialogTitle>

          <DialogDescription className='text-muted-foreground pt-2'>
            Please log in with an administrator account to access the management
            dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className='mt-6'>
          <Button className='w-full h-11 font-bold text-base'>
            Log in as Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
