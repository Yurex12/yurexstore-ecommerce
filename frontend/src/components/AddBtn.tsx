import type { ComponentProps } from 'react';

import { Plus } from 'lucide-react';

import { Button } from './ui/button';

export default function AddBtn({ onClick, title }: ComponentProps<'button'>) {
  return (
    <Button onClick={onClick}>
      <Plus className='size-4 text-white' /> <span> {title || 'New'}</span>
    </Button>
  );
}
