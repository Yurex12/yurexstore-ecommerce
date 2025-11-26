import { formatCurrency } from '@/lib/helpers';
import { format } from 'date-fns';
import { Package, Truck, User } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import ErrorState from '@/components/ErrorState';
import NoData from '@/components/NoData';
import { PageLoader } from '@/components/PageLoader';

import useAdminCancelOrder from '../hooks/useAdminCancelOrder';
import useAdminCompleteOrder from '../hooks/useAdminCompleteOrder';
import useAdminOrder from '../hooks/useAdminOrder';
import { getPaymentColor, getStatusColor } from '../utils/helpers';

export default function AdminOrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();

  const { order, isPending, error } = useAdminOrder(orderId);
  const { completeOrder, isPending: isDelivering } = useAdminCompleteOrder();
  const { cancelOrder, isPending: isCancelling } = useAdminCancelOrder();

  const isWorking = isDelivering || isCancelling;

  if (isPending) return <PageLoader message='Loading order' />;
  if (error) return <ErrorState message='Unable to load order' />;
  if (!order) return <NoData content='Order not found' />;

  return (
    <div className='mx-auto space-y-4'>
      <div className='border rounded-xl p-6 bg-gradient-to-br from-slate-50 to-slate-100/50'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-1 rounded-full bg-primary' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Order actions
              </h3>
            </div>

            <p className='ml-3 text-sm leading-relaxed text-gray-600'>
              {order.orderStatus === 'CANCELLED'
                ? 'This order is cancelled and can no longer be updated.'
                : order.orderStatus === 'DELIVERED'
                ? 'This order is delivered. No further action is needed.'
                : 'Choose how to complete this order: mark it as delivered or cancel it.'}
            </p>
          </div>

          {order.orderStatus === 'PENDING' && (
            <div className='flex w-full flex-col gap-3 sm:w-auto sm:min-w-[300px] sm:flex-row'>
              <Button
                className='w-full sm:w-auto'
                size='lg'
                disabled={isWorking}
                onClick={() => completeOrder(order.id)}
              >
                <Truck className='mr-2 h-4 w-4' />
                Mark as delivered
              </Button>

              <Button
                variant='destructive'
                className='w-full sm:w-auto'
                size='lg'
                disabled={isWorking}
                onClick={() => cancelOrder(order.id)}
              >
                Cancel order
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Order Information */}
        <div className='border rounded-lg p-5'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 bg-blue-50 rounded-lg'>
              <Package className='w-5 h-5 text-blue-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>Order Information</h3>
          </div>

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Order Date</span>
              <span className='font-medium text-gray-900'>
                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Payment Method</span>
              <span className='font-medium text-gray-900 capitalize'>
                {order.paymentMethod.replace('_', ' ')}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Delivery Fee</span>
              <span className='font-medium text-gray-900'>
                {formatCurrency(order.deliveryFee)}
              </span>
            </div>

            <div className='flex justify-between pt-3 border-t'>
              <span className='text-gray-700 font-semibold'>Total Amount</span>
              <span className='text-lg font-bold'>
                {formatCurrency(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className='border rounded-lg p-5'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 bg-green-50 rounded-lg'>
              <User className='w-5 h-5 text-green-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>Customer Details</h3>
          </div>

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Name</span>
              <span className='font-medium text-gray-900'>
                {order.user.name}
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Phone</span>
              <span className='font-medium text-gray-900'>0{order.phone}</span>
            </div>

            <div>
              <span className='text-gray-500 block mb-1'>Delivery Address</span>
              <p className='font-medium text-gray-900'>
                {order.deliveryAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className='border rounded-lg p-5'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 bg-purple-50 rounded-lg'>
              <Package className='w-5 h-5 text-purple-600' />
            </div>
            <h3 className='font-semibold text-gray-900'>Order Status</h3>
          </div>

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-500'>Order Status</span>
              <Badge
                className={`${getStatusColor(
                  order.orderStatus
                )} w-25 text-center py-1 px-3 rounded-md`}
              >
                {order.orderStatus}
              </Badge>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-500'>Payment Status</span>
              <Badge
                className={`${getPaymentColor(
                  order.paymentStatus
                )} w-25 text-center py-1 px-3 rounded-md`}
              >
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className='border rounded-lg overflow-hidden'>
        <div className='px-6 py-4'>
          <h3 className='font-semibold text-gray-900'>Order Items</h3>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b'>
              <tr>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Product
                </th>
                <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Variant
                </th>
                <th className='text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Quantity
                </th>
                <th className='text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Price
                </th>
                <th className='text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase'>
                  Total
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {order.orderItems.map((item) => (
                <tr
                  key={item.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-4'>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className='w-16 h-16 object-cover rounded-lg border'
                      />
                      <span className='font-medium text-gray-900'>
                        {item.productName}
                      </span>
                    </div>
                  </td>

                  <td className='px-6 py-4 text-gray-600'>
                    {item.productVariantValue || (
                      <span className='text-gray-400'>-</span>
                    )}
                  </td>

                  <td className='px-6 py-4 text-center'>
                    <span className='inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-medium text-gray-900'>
                      {item.quantity}
                    </span>
                  </td>

                  <td className='px-6 py-4 text-right font-medium text-gray-900'>
                    {formatCurrency(item.productPrice)}
                  </td>

                  <td className='px-6 py-4 text-right font-semibold text-gray-900'>
                    {formatCurrency(item.productPrice * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
