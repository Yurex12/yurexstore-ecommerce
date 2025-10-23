import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import AccountLayout from './layout/AccountLayout';
import AboutPage from './pages/About/AboutPage';
import AccountOverviewPage from './pages/AccountOverview/AccountOverviewPage';
import CartPage from './pages/Cart/CartPage';
import ContactPage from './pages/Contact/ContactPage';
import HomePage from './pages/Home/HomePage';
import OrdersPage from './pages/Orders/OrdersPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ShopPage from './pages/Shop/ShopPage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import OrderDetails from './features/order/components/OrderDetails';

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
            <Route path='/account' element={<AccountOverviewPage />} />
            <Route path='/account/orders' element={<OrdersPage />} />
            <Route path='/account/settings' element={<SettingsPage />} />
            <Route path='/account/reviews' element={<ReviewsPage />} />
            <Route path='/account/wishlist' element={<OrderDetails />} />
          </Route>
        </Route>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
