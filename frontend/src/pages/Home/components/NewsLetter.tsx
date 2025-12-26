import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));

    toast.success('Thanks for subscribing to our newsletter.');

    setEmail('');
  }
  return (
    <div className='mt-4 rounded-md sm:mt-20 md:mt-20 bg-muted/50'>
      <div className='mx-auto max-w-3xl px-6 py-14 text-center'>
        <h1 className='mb-2 heading text-center'>
          Subscribe to Our Newsletter
        </h1>
        <p className='mx-auto text-muted-foreground mb-6 w-11/12 px-1 text-sm sm:text-base md:w-9/12'>
          Get the latest updates, exclusive deals, and special offers delivered
          straight to your inbox.
        </p>
        <form
          className='flex flex-col items-center justify-center gap-4 md:flex-row md:gap-3 md:space-y-0'
          onSubmit={handleSubscribe}
        >
          <Input
            type='email'
            className='py-5 shadow-none placeholder:text-sm'
            placeholder='Enter your email address'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className='px-8'>Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
