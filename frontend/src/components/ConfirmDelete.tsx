import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

type ConfirmDeleteProps = {
  open: boolean;
  resourceName: string;
  disabled?: boolean;
  onConfirm: () => void;
  handleOpen: (value: boolean) => void;
};

export function ConfirmDelete({
  resourceName,
  disabled,
  onConfirm,
  handleOpen,
  open,
}: ConfirmDeleteProps) {
  return (
    <AlertDialog key={resourceName} open={open} onOpenChange={handleOpen}>
      <AlertDialogContent className='w-11/12 rounded-md sm:w-auto'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-left'>
            Delete {resourceName}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-left'>
            Are you sure you want to delete this {resourceName} permanently?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row justify-end gap-x-4'>
          <Button
            onClick={() => handleOpen(false)}
            className='focus:outline-none focus:ring-0 active:outline-none active:ring-0'
            disabled={disabled}
            variant='outline'
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            onClick={onConfirm}
            className='w-20 bg-red-500 hover:bg-red-600 flex items-center justify-center'
          >
            {disabled ? <Spinner /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
