import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className='max-w-[1440px] px-4 lg:px-10 mx-auto pt-25 md:pt-28'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
