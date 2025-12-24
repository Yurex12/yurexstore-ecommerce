import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className='relative flex flex-col-reverse md:flex-row h-auto md:h-[25rem] bg-accent rounded-md overflow-hidden'>
      {/* Responsive Background Glow */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute -top-12 -left-12 md:-top-24 md:-left-24 w-64 h-64 md:w-96 md:h-96 bg-primary/20 blur-[80px] md:blur-[100px] rounded-full' />
      </div>

      {/* Left Item: Content */}
      <div className='relative z-10 flex-1 flex flex-col justify-center items-center md:items-start p-6 sm:p-8 md:p-12 lg:p-16 gap-4 md:gap-6 text-center md:text-left'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]'>
          Everything You Need, <br className='hidden sm:block' />
          <span className='text-primary'> All in One Place.</span>
        </h1>

        <p className='text-sm sm:text-base text-muted-foreground max-w-[550px] leading-relaxed'>
          Elevate your space, your style, and your daily routine with a curated
          collection designed for a life well-lived.
        </p>

        <div className='mt-2 w-full sm:w-auto'>
          <Button className='sm:w-fit rounded-lg px-10 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow'>
            Shop Now
          </Button>
        </div>
      </div>

      {/* Right Item: Image */}
      <div className='relative z-10 flex-1 w-full h-full sm:h-80 md:h-full bg-muted/50 border-b md:border-b-0 md:border-l border-white/10'>
        {/* <div className='relative'> */}
        <img
          src='/hero.png'
          alt='Featured Products'
          className='w-full h-full object-cover'
        />
        {/* Subtle overlay to make the image blend better on mobile */}
        <div className='absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent md:hidden' />
      </div>
    </div>
  );
}
