import { Briefcase, MenuIcon, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';

export default function HeaderActions() {
  return (
    <div className='flex items-center space-x-4 text-2xl hover:cursor-pointer md:space-x-10'>
      <Briefcase className='text-gray-600' />
      <User className='text-2xl text-gray-600' />

      <div className='hidden md:block'>
        <Button className='w-fit rounded-lg bg-primary px-6 text-white hover:bg-primary/90'>
          Logout
        </Button>
      </div>

      <SheetTrigger asChild>
        <MenuIcon className='text-gray-600 lg:hidden' />
      </SheetTrigger>
    </div>
  );
}
