import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Package,
  LogOut,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export default function AccountActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent outline-0'>
          <User className='size-5' />
          <span className='hidden sm:inline font-medium'>Hi, Yusuf</span>
          <span className='hidden sm:inline'>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side='bottom'
        align='end'
        className='mt-2 w-52 rounded-md border border-border bg-popover p-1 shadow-lg'
      >
        {/* My Account */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account')}
        >
          <User size={18} className='text-foreground/80' />
          <span>My Account</span>
        </DropdownMenuItem>

        {/* Orders */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account/orders')}
        >
          <Package size={18} className='text-foreground/80' />
          <span>Orders</span>
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account/settings')}
        >
          <Package size={18} className='text-foreground/80' />
          <span>Settings</span>
        </DropdownMenuItem>

        {/* Wishlist */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/wishlist')}
        >
          <Heart size={18} className='text-foreground/80' />
          <span>Wishlist</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition'
          onClick={() => console.log('Logout')}
          variant='destructive'
        >
          <LogOut size={18} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
