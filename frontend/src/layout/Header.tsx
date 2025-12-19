import { useState } from 'react';

import HeaderActions from './HeaderActions';
import MobileNav from './MobileNav';

import Logo from '@/components/Logo';

import { Sheet } from '@/components/ui/sheet';
import ProductSearchBar from '@/features/product/components/ProductSearchBar';

function Header() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <header className='fixed top-0 z-50 mx-auto flex w-full items-center justify-between bg-background/80 border border-b border-input/40'>
      <div className='mx-auto flex max-w-[1440px]  flex-1 items-center justify-between p-6 backdrop-blur'>
        <Logo />
        {/* <NavBar /> */}

        <ProductSearchBar />

        <Sheet open={open} onOpenChange={setOpen}>
          <MobileNav onClose={handleClose} />
          <HeaderActions />
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
