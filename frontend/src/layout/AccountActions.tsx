import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useSignOut from '@/features/auth/hooks/useSignOut';
import useUser from '@/features/auth/hooks/useUser';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  LogOut,
  Package,
  User,
  UserCheck2,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, isPending: isSigningOut } = useSignOut();

  const { user } = useUser();

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Desktop (md and up) */}
      <div className='hidden md:block'>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent outline-0'>
            <UserCheck2 className='size-5' />
            <span className='font-medium'>
              Hi, {user?.name.split(' ')[0] || 'user'}
            </span>
            <span>
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>
        </DropdownMenuTrigger>
      </div>

      {/* Mobile (below md) */}
      <div className='block md:hidden'>
        <button onClick={() => navigate('/account/menu')}>
          <UserCheck2 className='size-5' />
        </button>
      </div>

      <DropdownMenuContent
        side='bottom'
        align='end'
        className='mt-2 w-52 rounded-md border border-border bg-popover p-1 shadow-lg'
      >
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account')}
        >
          <User size={18} className='text-foreground/80' />
          <span>My Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          onClick={() => navigate('/account/orders')}
        >
          <Package size={18} className='text-foreground/80' />
          <span>Orders</span>
        </DropdownMenuItem>

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
          variant='destructive'
          onClick={() => signOut()}
          disabled={isSigningOut}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
