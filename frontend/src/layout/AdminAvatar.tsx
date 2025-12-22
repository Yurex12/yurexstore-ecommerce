import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useUser from '@/features/auth/hooks/useUser';

export default function AdminAvatar() {
  const { user } = useUser();
  const firstName = user?.name?.split(' ')[0] || 'Admin';
  const initials = user?.email?.slice(0, 2).toUpperCase() || 'AD';

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback className='text-xs font-medium'>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className='hidden md:flex flex-col leading-tight'>
        <span className='text-sm font-medium text-gray-900'>{firstName}</span>
        <span className='text-xs text-gray-500'>Admin</span>
      </div>
    </div>
  );
}
