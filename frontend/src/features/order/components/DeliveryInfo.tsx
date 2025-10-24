export default function DeliveryInfo() {
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
  return (
    <div className='border rounded-xl p-4 bg-card space-y-4 flex-1'>
      <h3 className='font-semibold text-foreground'>Delivery Information</h3>

      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-foreground/80'>
          Payment Method
        </h3>
        <p className='text-sm text-muted-foreground'>
          {orderInfo.deliveryMethod}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-foreground/80'>
          Pick-up Station Address
        </h3>
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
      </div>

      <p className='text-sm text-muted-foreground mt-2'>
        {orderInfo.pickupStation.eta}
      </p>
    </div>
  );
}
