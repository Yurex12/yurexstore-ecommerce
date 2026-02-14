import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import AccountLayout from './layout/AccountLayout';
import AccountMobileMenu from './layout/AccountMobileMenu';

import AccountOverviewPage from './pages/AccountOverview/AccountOverviewPage';
import AddressPage from './pages/Address/AddressPage';
import CartPage from './pages/Cart/CartPage';

import HomePage from './pages/Home/HomePage';
import OrderDetailsPage from './pages/OrderDetails/OrderDetailsPage';
import OrdersPage from './pages/Orders/OrdersPage';
import ShopPage from './pages/Shop/ShopPage';
import SignInPage from './pages/SignIn/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import UpdatePasswordPage from './pages/UpdatePassword/UpdatePasswordPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import WriteReviewPage from './pages/WriteReview/WriteReviewPage';

import AdminLayout from './layout/AdminLayout';

import AdminProtectedRoute from './layout/AdminProtectedRoute';
import ProtectedRoute from './layout/ProtectedRoute';
import AdminOrderDetailsPage from './pages/AdminOrderDetails/AdminOrderDetailsPage';
import AdminOrdersPage from './pages/AdminOrders/AdminOrdersPage';
import AdminProductCreatePage from './pages/AdminProductCreate/AdminProductCreatePage';
import AdminProductEditPage from './pages/AdminProductEdit/AdminProductEditPage';
import AdminProductsPage from './pages/AdminProducts/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsers/AdminUsersPage';
import AdminCategoriesPage from './pages/Categories/AdminCategoriesPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import AdminColorsPage from './pages/Color/AdminColorsPage';

import AdminOverviewPage from './pages/AdminOverview/AdminOverviewPage';
import CreateAddressPage from './pages/CreateAddress/CreateAddressPage';
import EditAddressPage from './pages/EditAddress/EditAddressPage';
import OrderConfirmationPage from './pages/OrderConfirmation/OrderConfirmationPage';
import PendingReviewsPage from './pages/PendingReviews/PendingReviewsPage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/shop' element={<ShopPage />} />
              <Route path='/shop/:productId' element={<ProductDetailsPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/cart' element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path='/account' element={<AccountLayout />}>
                  <Route index element={<Navigate to='overview' replace />} />

                  <Route path='overview' element={<AccountOverviewPage />} />
                  <Route path='orders' element={<OrdersPage />} />
                  <Route
                    path='pending-reviews'
                    element={<PendingReviewsPage />}
                  />
                  <Route path='wishlist' element={<WishlistPage />} />
                  <Route path='orders/:id' element={<OrderDetailsPage />} />
                  <Route
                    path='update-password'
                    element={<UpdatePasswordPage />}
                  />
                  <Route
                    path='pending-reviews/:pendingReviewId/write'
                    element={<WriteReviewPage />}
                  />
                  <Route path='addresses' element={<AddressPage />} />
                  <Route
                    path='addresses/form/new'
                    element={<CreateAddressPage />}
                  />
                  <Route
                    path='addresses/form/:id'
                    element={<EditAddressPage />}
                  />
                </Route>

                <Route path='/account/menu' element={<AccountMobileMenu />} />
              </Route>
            </Route>

            <Route path='/login' element={<SignInPage />} />
            <Route path='/register' element={<SignUpPage />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path='/order-confirmation'
                element={<OrderConfirmationPage />}
              />
            </Route>
            {/* Admin */}
            <Route
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route
                path='/admin'
                index
                element={<Navigate to='overview' replace />}
              />
              <Route path='/admin/overview' element={<AdminOverviewPage />} />
              <Route path='/admin/colors' element={<AdminColorsPage />} />
              <Route
                path='/admin/categories'
                element={<AdminCategoriesPage />}
              />
              <Route path='/admin/products' element={<AdminProductsPage />} />
              <Route
                path='/admin/products/new'
                element={<AdminProductCreatePage />}
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}
