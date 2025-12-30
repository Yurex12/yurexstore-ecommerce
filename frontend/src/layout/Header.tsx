import HeaderActions from './HeaderActions';

import Logo from '@/components/Logo';

import MobileProductsSearchWrapper from '@/features/product/components/MobileProductsSearchWrapper';
import ProductsSearchBar from '@/features/product/components/ProductsSearchBar';

function Header() {
  return (
    <header className='fixed top-0 z-50 mx-auto flex w-full items-center justify-between bg-background/80 border border-b border-input/40'>
      <div className='mx-auto flex max-w-[1600px] px-4 lg:px-10 py-4  flex-1 items-center justify-between backdrop-blur'>
        <Logo />

        {/* Desktop - hidden on smaller screens */}
        <ProductsSearchBar />

        <MobileProductsSearchWrapper />

        <HeaderActions />
      </div>
    </header>
  );
}

export default Header;
