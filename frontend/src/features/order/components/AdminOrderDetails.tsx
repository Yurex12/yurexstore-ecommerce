import { formatCurrency } from '@/lib/helpers';
import { format } from 'date-fns';
import { Package, Truck, User } from 'lucide-react';
import { useParams } from 'react-router-dom';

import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import useAdminOrder from '../hooks/useAdminOrder';
import { getPaymentColor, getStatusColor } from '../utils/helpers';

export default function AdminOrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    order,
    isPending,
    error,
    // mutateMarkCompleted,
    // mutateCancelOrder,
    // isSubmitting,
  } = useAdminOrder(orderId);

  if (isPending) return <Spinner />;
  if (error) return <InlineError message='Unable to load order' />;
  if (!order) return <EmptyState message='Order not found' />;

  return (
    <div className='max-w-7xl mx-auto py-6 space-y-6'>
      {/* Info Cards Grid */}
      {/* Info Cards Grid */}
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
              <span className='text-lg font-bold text-blue-700'>
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
                )} text-xs px-2 py-0.5`}
              >
                {order.orderStatus}
              </Badge>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-500'>Payment Status</span>
              <Badge
                className={`${getPaymentColor(
                  order.paymentStatus
                )} text-xs px-2 py-0.5`}
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

      {/* Actions Panel */}
      <div className='border rounded-lg p-5'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>Order Actions</h3>
            <p className='text-sm text-gray-500'>
              Update order status or cancel the order
            </p>
          </div>

          <div className='flex gap-3 w-full sm:w-auto'>
            <Button
              className='flex-1 sm:flex-none'
              size='lg'
              // disabled={isSubmitting}
              // onClick={() => mutateMarkCompleted(orderId)}
            >
              <Truck className='w-4 h-4 mr-2' />
              Mark as Completed
            </Button>

            <Button
              variant='destructive'
              className='flex-1 sm:flex-none'
              size='lg'
              // disabled={isSubmitting || order.orderStatus === 'CANCELLED'}
              // onClick={() => mutateCancelOrder(orderId)}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
