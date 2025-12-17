export default function OrderDeliveryInfo({
  deliveryAddress,
  phone,
}: {
  deliveryAddress: string;
  phone: string;
}) {
  return (
    <div className='border rounded-xl p-4 bg-card space-y-4 flex-1'>
      <h3 className='font-semibold text-foreground'>Delivery Information</h3>
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-foreground/80'>
          Delivery Address
        </h3>
        <p className='text-sm text-muted-foreground'>{deliveryAddress}</p>
        <p className='text-sm text-muted-foreground'>{phone}</p>
      </div>
    </div>
  );
}
