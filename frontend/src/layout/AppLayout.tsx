import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className='max-w-[1440px] px-6 mx-auto mt-40 md:mt-28'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
