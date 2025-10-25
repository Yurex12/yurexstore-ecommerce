import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Package,
  LogOut,
  User,
  UserCheck,
  UserCheck2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const MOBILE_SCREEN = 640;

export default function AccountActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {window.innerWidth > MOBILE_SCREEN ? (
        <DropdownMenuTrigger asChild>
          <button className='flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent outline-0'>
            <UserCheck2 className='size-5' />
            <span className='font-medium'>Hi, Yusuf</span>
            <span>
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>
        </DropdownMenuTrigger>
      ) : (
        <button onClick={() => navigate('/account/menu')}>
          <UserCheck2 className='size-5' />
        </button>
      )}

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

        {/* Wishlist */}
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account/wishlist')}
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
