import { Button } from '@/components/ui/button';

export default function NewsLetter() {
  return (
    <div className='container mx-auto mt-4 rounded-md sm:mt-20 md:mt-20 bg-gray-50'>
      <div className='mx-auto max-w-3xl px-6 py-14 text-center'>
        <h1 className='mb-2 text-lg font-semibold sm:text-2xl md:text-4xl'>
          Subscribe to Our Newsletter
        </h1>
        <p className='mx-auto mb-6 w-11/12 px-1 text-sm sm:text-base md:w-9/12'>
          Get the latest updates, exclusive deals, and special offers delivered
          straight to your inbox.
        </p>
        <form className='flex flex-col items-center justify-center gap-4 md:flex-row md:gap-3 md:space-y-0'>
          <input
            type='email'
            className='w-10/12 rounded-lg border border-primary bg-white px-4 py-1 shadow-sm outline-none placeholder:text-[0.8rem] md:w-3/5 md:py-3'
            placeholder='Enter your email address'
          />
          <Button className='py-2 md:py-6 px-8  text-white' type='submit'>
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
