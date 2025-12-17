import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateAddress } from '../hooks/useCreateAddress';
import {
  type CreateAddressSchema,
  createAddressSchema,
} from '../schemas/addressSchema';

export function CreateAddressForm() {
  const { createAddress, isPending: isCreatingAddress } = useCreateAddress();
  const navigate = useNavigate();

  const form = useForm<CreateAddressSchema>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      deliveryAddress: '',
      city: '',
      state: '',
      phone: '',
      default: false,
    },
  });

  function onSubmit(values: CreateAddressSchema) {
    createAddress(values, {
      onSuccess() {
        form.reset();
        navigate('/account/addresses');
      },
    });
  }

  const isSubmitting = form.formState.isSubmitting || isCreatingAddress;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 py-6 rounded bg-background px-4'
      >
        <div className='grid grid-cols-2 gap-3'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    placeholder='First name'
                    className={'py-5 shadow-none placeholder:text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    placeholder='Last name'
                    className={'py-5 shadow-none placeholder:text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='deliveryAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  {...field}
                  placeholder='Street address'
                  className={'py-5 shadow-none placeholder:text-sm'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-3'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    placeholder='City'
                    className={'py-5 shadow-none placeholder:text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    placeholder='State'
                    className={'py-5 shadow-none placeholder:text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  {...field}
                  type='tel'
                  placeholder='+234 900 000 0000'
                  className={'py-5 shadow-none placeholder:text-sm'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='default'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  disabled={isSubmitting}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='text-sm font-normal cursor-pointer'>
                Set as default address
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-34' disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : <span>Create Address</span>}
        </Button>
      </form>
    </Form>
  );
}
