import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  desc?: string;
}

export function LoginRequiredDialog({
  open,
  onOpenChange,
  title = 'Login Required',
  desc = 'Please sign in to your account to continue with this action.',
}: LoginRequiredDialogProps) {
  const navigate = useNavigate();

  const location = useLocation();

  const url = encodeURIComponent(location.pathname + location.search);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:w-md'>
        <DialogHeader className='flex flex-col'>
          <DialogTitle className='text-2xl font-bold'>{title}?</DialogTitle>
          <DialogDescription className='text-base text-left pt-2'>
            {desc}
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center gap-3 mt-2'>
          <Button
            variant='outline'
            className='flex-1'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className='px-4 flex-1'
            onClick={() => navigate(`/login?redirectURL=${url}`)}
          >
            <LogIn className='h-4 w-4' />
            Sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
