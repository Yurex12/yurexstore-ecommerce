import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Button } from './ui/button';
import { Info } from 'lucide-react';

type ConfirmDeleteProps = {
  open: boolean;
  resourceName: string;
  disabled?: boolean;
  onConfirm: () => void;
  handleOpen: (value: boolean) => void;
};

export function ConfirmDelete({
  resourceName,
  // disabled,
  // onConfirm,
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

          {/* Friendly Info Message */}
          <div className='mt-3 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800'>
            <Info className='h-4 w-4 shrink-0 mt-0.5' />
            <p>
              <b>Note:</b> Deletion is currently disabled for this demo.
              Everything works, but we want to keep the data intact for other
              visitors to explore! 🥴
            </p>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className='flex flex-row justify-end gap-x-4'>
          <Button
            onClick={() => handleOpen(false)}
            className='focus:outline-none focus:ring-0 active:outline-none active:ring-0'
            variant='outline'
          >
            Cancel
          </Button>
          <Button
            disabled={true}
            className='w-20 bg-red-400 opacity-70 cursor-not-allowed flex items-center justify-center text-white'
          >
            Delete
          </Button>

          {/* <Button
            disabled={disabled}
            onClick={onConfirm}
            className='w-20 bg-red-500 hover:bg-red-600 flex items-center justify-center'
          >
            {disabled ? <Spinner /> : 'Delete'}
          </Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
