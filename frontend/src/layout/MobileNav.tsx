import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';

import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { links } from './constants';

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
                <span className='block rounded-lg border-l-4 border-l-background py-2 pl-3'>
                  {link.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </SheetContent>
    </>
  );
}
