import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import AccountLayout from './layout/AccountLayout';
import AccountMobileMenu from './layout/AccountMobileMenu';
import AboutPage from './pages/About/AboutPage';
import AccountOverviewPage from './pages/AccountOverview/AccountOverviewPage';
import AddressPage from './pages/Address/AddressPage';
import CartPage from './pages/Cart/CartPage';
import ContactPage from './pages/Contact/ContactPage';
import HomePage from './pages/Home/HomePage';
import OrderDetailsPage from './pages/OrderDetails/OrderDetailsPage';
import OrdersPage from './pages/Orders/OrdersPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ShopPage from './pages/Shop/ShopPage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import UpdatePasswordPage from './pages/UpdatePassword/UpdatePasswordPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import WriteReviewPage from './pages/WriteReview/WriteReviewPage';

import AdminLayout from './layout/AdminLayout2';

import AdminOrderDetailsPage from './pages/AdminOrderDetails/AdminOrderDetailsPage';
import AdminOrdersPage from './pages/AdminOrders/AdminOrdersPage';
import AdminProductCreatePage from './pages/AdminProductCreate/AdminProductCreatePage';
import AdminProductEditPage from './pages/AdminProductEdit/AdminProductEditPage';
import AdminProductsPage from './pages/AdminProducts/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsers/AdminUsersPage';
import AdminCategoriesPage from './pages/CategoriesPage/AdminCategoriesPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import AdminColorsPage from './pages/Color/AdminColorsPage';
import PendingReviewsPage from './pages/PendingReviews/PendingReviewsPage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/shop/:productId' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/about-us' element={<AboutPage />} />
            <Route path='/contact-us' element={<ContactPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            {/* Account */}
            <Route element={<AccountLayout />}>
              <Route path='/account' element={<AccountOverviewPage />} />
              <Route path='/account/orders' element={<OrdersPage />} />
              <Route path='/account/settings' element={<SettingsPage />} />
              <Route
                path='/account/pending-reviews'
                element={<PendingReviewsPage />}
              />
              <Route path='/account/wishlist' element={<WishlistPage />} />
              <Route
                path='/account/orders/:id'
                element={<OrderDetailsPage />}
              />
              <Route
                path='/account/update-password'
                element={<UpdatePasswordPage />}
              />
              <Route
                path='/account/pending-reviews/:pendingReviewId/write'
                element={<WriteReviewPage />}
              />
              <Route path='/account/addresses' element={<AddressPage />} />
            </Route>

            <Route path='/account/menu' element={<AccountMobileMenu />} />
          </Route>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/register' element={<SignUpPage />} />
          {/* Admin */}
          <Route element={<AdminLayout />}>
            <Route path='/admin/colors' element={<AdminColorsPage />} />
            <Route path='/admin/categories' element={<AdminCategoriesPage />} />
            <Route path='/admin/products' element={<AdminProductsPage />} />
            <Route
              path='/admin/products/new'
              element={<AdminProductCreatePage />}
            />
            <Route
              path='/admin/products/edit/:productId'
              element={<AdminProductEditPage />}
            />
            <Route
              path='/admin/products/edit/:productId'
              element={<AdminProductEditPage />}
            />
            <Route path='/admin/orders' element={<AdminOrdersPage />} />
            <Route
              path='/admin/orders/:orderId'
              element={<AdminOrderDetailsPage />}
            />

            <Route path='/admin/users' element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
