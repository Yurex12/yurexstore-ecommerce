import { useOrderStore } from '../store/useOrderStore';
import { OrderCard } from './OrderCard';

export default function OrderList() {
  const { value } = useOrderStore();
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

  console.log(value);

  return (
    <ul className='space-y-4'>
      {mockOrders.map((order) => (
        <li key={order.id}>
          {' '}
          <OrderCard order={order} />
        </li>
      ))}
    </ul>
  );
}
