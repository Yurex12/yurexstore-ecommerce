import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components//ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Spinner } from '@/components/ui/spinner';
import useSignIn from '../hooks/useSignIn';
import { signInSchema, type SignInSchema } from '../schemas/signInSchema';

export default function SignInForm() {
  const { signIn, isPending } = useSignIn();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'sheriffamar3@gmail.com',
      password: 'Adeyemi@17',
      rememberMe: false,
    },
  });

  function onsubmit(userDetails: SignInSchema) {
    signIn(userDetails);
  }

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email </FormLabel>
              <FormControl>
                <Input
                  placeholder='johndoe@gmail.com'
                  className='py-5 shadow-none placeholder:text-sm'
                  type='text'
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='********'
                  className='py-5 shadow-none placeholder:text-sm'
                  type='password'
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex items-center'>
              <FormControl>
                <Checkbox
                  id='rememberMe'
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  onBlur={field.onBlur}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormLabel htmlFor='rememberMe' className='text-foreground/70'>
                Remember me
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : <span>Sign in</span>}
        </Button>
      </form>
    </Form>
  );
}
