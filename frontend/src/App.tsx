import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import ShopPage from './pages/Shop/ShopPage';
import CartPage from './pages/Cart/CartPage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import AccountLayout from './layout/AccountLayout';
import SettingsPage from './pages/Settings/SettingsPage';
import OrdersPage from './pages/Orders/OrdersPage';

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
          <Route element={<AccountLayout />}>
            <Route path='/account/orders' element={<OrdersPage />} />
            <Route path='/account/settings' element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
