import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className='flex flex-col-reverse items-center md:flex-row '>
      {/* left item */}
      <div className='space-y-5 py-6 md:basis-1/2 md:space-y-8'>
        <h1 className='space-y-1 text-center text-xl font-bold sm:text-3xl md:text-left lg:text-4xl xl:text-5xl'>
          <span className='block text-primary'>Step into the</span>
          <span className='block'>New Season in Style</span>
          {/* <span className='block text-primary'>New Drops</span> <span className='block'>Fresh Fits for the Season</span> */}
        </h1>
        <p className='mx-auto max-w-md text-center text-sm md:mx-0 md:text-left md:text-base'>
          Discover our latest arrivals crafted for comfort and elegance. Elevate
          your wardrobe with our new season collection.
        </p>
        <div className='flex items-center justify-center md:justify-start'>
          <Button className='w-fit rounded-lg bg-foreground px-10 text-background hover:bg-foreground/90'>
            Shop Now
          </Button>
        </div>
      </div>
      {/* right item */}
      <div className='md:basis-1/2'>
        <img src='/hero.png' alt='brand-picture' />
      </div>
    </div>
  );
}
