import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import ShopPage from './pages/Shop/ShopPage';
import CartPage from './pages/Cart/CartPage';

import AppLayout from './layout/AppLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/about-us' element={<AboutPage />} />
          <Route path='/contact-us' element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
