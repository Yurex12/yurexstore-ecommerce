export default function OrderProductList({ order }) {
  const formatCurrency = (n: number) => `₦${n.toLocaleString()}`;

  return (
    <div className='space-y-3'>
      {order.products.map((product) => (
        <div
          key={product.id}
          className='flex items-center gap-4 border rounded-lg p-3 bg-background'
        >
          <img
            src={product.image}
            alt={product.name}
            className='size-16 rounded object-cover'
          />

          <div className='flex-1'>
            <h4 className='font-medium'>{product.name}</h4>
            <p className='text-sm text-muted-foreground'>
              Qty: {product.quantity}
            </p>
          </div>

          <p className='font-semibold text-muted-foreground '>
            {formatCurrency(product.price * product.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
}
