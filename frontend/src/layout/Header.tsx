import Logo from '@/components/Logo';
import NavBar from './Navbar';

function Header() {
  return (
    <header className='fixed top-0 z-50 mx-auto flex w-full items-center justify-between bg-white shadow'>
      <div className='mx-auto flex max-w-[1440px]  flex-1 items-center justify-between p-6'>
        <Logo />
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
