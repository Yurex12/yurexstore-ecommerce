import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Eye, EyeOff } from 'lucide-react';

import { signUpSchema, type SignUpSchema } from '../schemas/signUpSchema';
import { useSignUp } from '../hooks/useSignUp';
import { Spinner } from '@/components/ui/spinner';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, isPending } = useSignUp();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  });

  const isSigningUp = form.formState.isSubmitting || isPending;

  async function onSubmit(values: SignUpSchema) {
    signUp(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='john doe'
                  className='py-5 shadow-none placeholder:text-sm'
                  type='text'
                  {...field}
                  disabled={isSigningUp}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='johndoe@gmail.com'
                  className='py-5 shadow-none placeholder:text-sm'
                  type='email'
                  {...field}
                  disabled={isSigningUp}
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
                <div className='relative'>
                  <Input
                    placeholder='********'
                    type={showPassword ? 'text' : 'password'}
                    className='py-5 shadow-none placeholder:text-sm pr-10'
                    {...field}
                    disabled={isSigningUp}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='********'
                    type={showConfirmPassword ? 'text' : 'password'}
                    className='py-5 shadow-none placeholder:text-sm pr-10'
                    {...field}
                    disabled={isSigningUp}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isSigningUp}>
          {isSigningUp ? <Spinner /> : <span>Sign up</span>}
        </Button>
      </form>
    </Form>
  );
}
