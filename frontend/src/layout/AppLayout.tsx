import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className='max-w-[1600px] h-full flex-1 px-4 lg:px-10 mx-auto mt-21 md:mt-24'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
