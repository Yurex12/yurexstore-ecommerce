export default function OrderSummary() {
  return (
    <div className='basis-2/6 lg:mt-10 '>
      <div className='mx-auto rounded-sm bg-gray-50 px-8 py-8'>
        <h2 className='text-xl font-semibold text-gray-700'>Order summary</h2>

        {/* <!-- order table --> */}
        <div className='my-4'>
          {/* <!-- subtotal --> */}
          <div className='flex items-center justify-between border-b-2 py-4'>
            <p className='text-gray-500'>Items 5</p>
            <p className='font-[400]'>
              $200.00<span className='subtotal'></span>
            </p>
          </div>
          {/* <!-- Shipping estimate --> */}
          <div className='flex items-center justify-between border-b-2 py-4'>
            <p className='text-gray-500'>
              Shipping estimate <br />
              (5% of subtotal)
            </p>
            <p className='font-[400]'>
              $200.00<span data-shipping-estimate></span>
            </p>
          </div>
          {/* <!-- Tax estimate --> */}
          <div className='flex items-center justify-between border-b-2 py-4'>
            <p className='text-gray-500'>Task</p>
            <p className='font-[400]' data-tax>
              $<span>5.00</span>
            </p>
          </div>
          {/* <!-- order total --> */}
          <div className='flex items-center justify-between py-4'>
            <p className='text-md font-semibold text-gray-700'>Order total</p>
            <p className='text-md font-semibold text-gray-700'>
              $405.00<span data-cart-total></span>
            </p>
          </div>
        </div>

        {/* <!-- button --> */}
        <button className='w-full rounded-md bg-indigo-600 py-2 text-center text-lg text-white hover:bg-indigo-700'>
          Checkout
        </button>
      </div>
    </div>
  );
}
