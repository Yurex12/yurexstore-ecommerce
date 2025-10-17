import CartItem from './CartItem';

function CartItemsList() {
  return (
    <div className='basis-4/6 divide-y md:mt-4'>
      {[1, 2, 3, 4, 5].map((_, i) => (
        <CartItem key={i} />
      ))}
    </div>
  );
}

export default CartItemsList;
