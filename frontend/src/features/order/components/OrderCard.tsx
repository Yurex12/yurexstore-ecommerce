import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  products: Product[];
  total: number;
};

export function OrderCard({ order }: { order: Order }) {
  const statusColor =
    order.status === 'delivered'
      ? 'bg-green-100 text-green-700'
      : order.status === 'processing'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700';

  return (
    <Card className='border border-input rounded-xl  hover:shadow-md transition-shadow shadow-none duration-200'>
      {/* Header */}
      <CardHeader className='flex flex-row items-center justify-between gap-2 pb-3 border-b border-border/30'>
        <div>
          <CardTitle className='text-base font-semibold text-foreground/90'>
            Order #{order.id}
          </CardTitle>
          <p className='text-sm text-muted-foreground'>{order.date}</p>
        </div>

        <Badge variant='secondary' className={`${statusColor} capitalize`}>
          {order.status}
        </Badge>
      </CardHeader>

      {/* Content */}
      <CardContent className='space-y-4'>
        {/* Product list */}
        <div className='space-y-3'>
          {order.products.slice(0, 3).map((product) => (
            <div key={product.id} className='flex items-center gap-3'>
              <img
                src={product.image}
                alt={product.name}
                className='size-12 rounded-md border object-cover'
              />
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-foreground/90'>
                  {product.name}
                </p>
                <p className='text-xs text-muted-foreground'>
                  Qty: {product.quantity}
                </p>
              </div>
            </div>
          ))}

          {order.products.length > 3 && (
            <p className='text-sm text-muted-foreground'>
              +{order.products.length - 3} more item
              {order.products.length - 3 > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Total and CTA */}
        <div className='flex items-center justify-between border-t border-border/30 pt-4'>
          <p className='text-sm text-foreground/80'>
            Total:{' '}
            <span className='font-semibold text-foreground'>
              ₦{order.total.toLocaleString()}
            </span>
          </p>
          <Button
            variant='outline'
            size='sm'
            className='shadow-none text-foreground/70'
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
