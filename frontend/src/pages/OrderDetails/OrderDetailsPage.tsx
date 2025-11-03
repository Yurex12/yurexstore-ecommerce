// adjust path
import { Separator } from '@/components/ui/separator';
import DeliveryInfo from '@/features/order/components/DeliveryInfo';
import OrderProductList from '@/features/order/components/OrderProductList';
import OrderStatus from '@/features/order/components/OrderStatus';
import PaymentInfo from '@/features/order/components/PaymentInfo';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockOrders = [
  {
    id: '3456',
    date: 'Oct 20, 2025',
    status: 'delivered',
    total: 120000,
    products: [
      {
        id: '1',
        name: 'Nike Air Zoom',
        image: '/shirt.png',
        price: 45000,
        quantity: 1,
      },
      {
        id: '2',
        name: 'Cotton Hoodie',
        image: '/item.jpg',
        price: 30000,
        quantity: 2,
      },
      {
        id: '3',
        name: 'Headphones',
        image: '/shirt.png',
        price: 15000,
        quantity: 1,
      },
      {
        id: '4',
        name: 'Smart Watch',
        image: '/shirt.png',
        price: 30000,
        quantity: 1,
      },
    ],
  },
  {
    id: '3460',
    date: 'Oct 15, 2025',
    status: 'processing',
    total: 65000,
    products: [
      {
        id: '1',
        name: 'Running Shorts',
        image: '/shirt.png',
        price: 25000,
        quantity: 1,
      },
      {
        id: '2',
        name: 'Backpack',
        image: '/shirt.png',
        price: 40000,
        quantity: 1,
      },
    ],
  },
  {
    id: '3475',
    date: 'Oct 10, 2025',
    status: 'cancelled',
    total: 35000,
    products: [
      {
        id: '1',
        name: 'Sneakers',
        image: '/shirt.png',
        price: 35000,
        quantity: 1,
      },
    ],
  },
];

export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const id = '3456';
  const order = mockOrders.find((o) => o.id === id);

  const orderInfo = {
    id: '3456',
    date: 'Oct 20, 2025',
    status: 'delivered',
    total: 13710,
    subtotal: 13460,
    deliveryFee: 250,
    paymentMethod: 'Pay on Delivery (Bank Transfer)',
    deliveryMethod: 'Pick-up Station',
    pickupStation: {
      name: 'Jumia Pickup Station Ikorodu-Garage',
      address:
        '48, Owolowo street, printing press market road, Ojubode Ikorodu, Lagos',
      note: 'Close to Esso Hospital',
      location: 'Ikorodu-Garage, Lagos',
      openingHours: 'Mon-Fri 8am-7pm ; Sat 10.30AM-6.30PM',
      eta: 'Delivery between 23 July and 24 July.',
    },
  };

  if (!order) {
    return (
      <div className='p-6'>
        <p className='text-muted-foreground'>Order not found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center gap-x-4'>
          <ArrowLeft onClick={() => navigate('/account/orders')} />
          <h2 className='text-xl font-semibold text-foreground'>
            Order Details
          </h2>
        </div>

        <Separator />
      </div>

      <div className='flex flex-col gap-y-1 pb-4 '>
        <h2 className='text-md font-semibold text-foreground/80'>
          Order #{order.id}
        </h2>
        <span className='text-sm text-muted-foreground'>
          Placed on {order.date}
        </span>

        <OrderStatus status={order.status} />
      </div>

      <OrderProductList order={order} />

      <div className='flex flex-col md:flex-row gap-4'>
        <PaymentInfo orderInfo={orderInfo} />
        <DeliveryInfo orderInfo={orderInfo} />
      </div>
    </div>
  );
}
