import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';

import { NavLink } from 'react-router-dom';
import { links } from './constants';
import { LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MobileNav({ onClose }: { onClose: VoidFunction }) {
  return (
    <>
      <SheetTitle className='sr-only'>Navbar</SheetTitle>
      <SheetDescription className='sr-only'>A mobile navbar</SheetDescription>
      <SheetContent className='sheet-content m-0 w-[250px] border-0 p-0 gap-0 flex flex-col'>
        <SheetClose className='flex justify-end pb-2 pr-6 pt-4 border-none outline-none'>
          <X className='text-2xl' />
        </SheetClose>

        <ul className='basis-4/5'>
          {links.map((link) => (
            <li key={link.href} onClick={() => setTimeout(onClose, 50)}>
              <NavLink to={link.href} className={`block w-full py-1`}>
                <span className='block rounded-lg border-l-4 border-l-white py-2 pl-3'>
                  {link.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* logout button */}
        <div className='flex justify-center'>
          <Button className='rounded-lg bg-primary text-background hover:bg-primary/90 w-7/12'>
            <span>Logout</span>
            <LogOut />
          </Button>
        </div>
      </SheetContent>
    </>
  );
}
