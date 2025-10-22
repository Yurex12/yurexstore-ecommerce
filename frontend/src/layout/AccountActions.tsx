import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, Store, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export default function AccountActions() {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className='outline- py-2 px-4 data-[state=open]:bg-primary/10 rounded-md'
      >
        <button className='flex items-center justify-center gap-x-2 text-foreground/80'>
          <User />
          <span className=' hidden sm:inline text-sm'>Hi, Yusuf</span>
          <span className=' hidden sm:inline'>
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side='bottom'
        align='center'
        className='w-48 p-1 shadow'
      >
        <DropdownMenuItem className='p-0'>
          <Link
            className='flex cursor-pointer items-center gap-3 rounded-md border-0  py-2  text-foreground/60 outline-0 px-3 transition hover:bg-accent hover:text-foreground/70 w-full'
            to='/account/user'
          >
            <User className='size-5 text-foreground' />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-0'>
          <Link
            className='flex cursor-pointer items-center gap-3 rounded-md border-0  py-2  text-foreground/60 outline-0 px-3 transition hover:bg-accent hover:text-foreground/70 w-full'
            to='/account/wishlist'
          >
            <Store className='size-5 text-foreground' />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-0'>
          <Link
            className='flex cursor-pointer items-center gap-3 rounded-md border-0  py-2  text-foreground/60 outline-0 px-3 transition hover:bg-accent hover:text-foreground/70 w-full'
            to='/account/wishlist'
          >
            <Heart className='size-5 text-foreground' />
            <span>Wishlist</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
