import { useParams } from 'react-router-dom';
// adjust path
import { Badge } from '@/components/ui/badge';

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

export default function OrderDetails() {
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

  const format = (n: number) => `₦${n.toLocaleString()}`;

  if (!order) {
    return (
      <div className='p-6'>
        <p className='text-muted-foreground'>Order not found.</p>
      </div>
    );
  }

  const formatCurrency = (n: number) => `₦${n.toLocaleString()}`;

  return (
    <div className='space-y-6 p-4 lg:p-8'>
      {/* Header */}
      <div className='flex flex-col gap-1 border-b pb-4 border-input'>
        <h2 className='text-xl font-semibold text-foreground'>
          Order #{order.id}
        </h2>
        <span className='text-sm text-muted-foreground'>
          Placed on {order.date}
        </span>
        <Badge
          variant={
            order.status === 'delivered'
              ? 'default'
              : order.status === 'processing'
              ? 'secondary'
              : 'destructive'
          }
          className='w-fit'
        >
          {order.status}
        </Badge>
      </div>

      {/* Product List */}
      <div className='space-y-4'>
        {order.products.map((product) => (
          <div
            key={product.id}
            className='flex items-center gap-4 border rounded-lg p-3 bg-card'
          >
            <img
              src={product.image}
              alt={product.name}
              className='w-16 h-16 rounded object-cover'
            />

            <div className='flex-1'>
              <h4 className='font-medium'>{product.name}</h4>
              <p className='text-sm text-muted-foreground'>
                Qty: {product.quantity}
              </p>
            </div>

            <p className='font-semibold'>
              {formatCurrency(product.price * product.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        {/* Payment Information */}
        <div className='border rounded-xl p-4 bg-card space-y-4 flex-1'>
          <h3 className='font-semibold text-foreground'>Payment Information</h3>

          <div>
            <p className='text-sm font-medium'>Payment Method</p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.paymentMethod}
            </p>
          </div>

          <div className='space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span>Items total:</span>
              <span>{format(orderInfo.subtotal)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Delivery Fees:</span>
              <span>{format(orderInfo.deliveryFee)}</span>
            </div>
            <div className='flex justify-between font-medium'>
              <span>Total:</span>
              <span>{format(orderInfo.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className='borderInfo rounded-xl p-4 bg-card space-y-4 flex-1'>
          <h3 className='font-semibold text-foreground'>
            Delivery Information
          </h3>

          <div>
            <p className='text-sm font-medium'>Delivery Method</p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.deliveryMethod}
            </p>
          </div>

          <div>
            <p className='text-sm font-medium'>Pick-up Station Address</p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.pickupStation.name}
            </p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.pickupStation.address}
            </p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.pickupStation.note}
            </p>
            <p className='text-sm text-muted-foreground'>
              {orderInfo.pickupStation.location}
            </p>
            <p className='text-sm text-muted-foreground'>
              Opening Hours: {orderInfo.pickupStation.openingHours}
            </p>

            <button className='mt-2 text-primary text-sm hover:underline'>
              See Location
            </button>
          </div>

          <p className='text-sm text-muted-foreground mt-2'>
            {orderInfo.pickupStation.eta}
          </p>
        </div>
      </div>
    </div>
  );
}
