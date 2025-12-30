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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createAddressSchema,
  type CreateAddressSchema,
} from '../schemas/addressSchema';
import { useAddressStore } from '../store/useAddressStore';
import { useCreateAddress } from '../hooks/useCreateAddress';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

export function CheckoutAddressForm() {
  const { showSelectedAddress } = useAddressStore();
  const { createAddress, isPending } = useCreateAddress();

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
        showSelectedAddress();
      },
    });
  }

  function fillDummyAddress() {
    form.reset({
      firstName: 'Ade',
      lastName: 'Olawale',
      deliveryAddress: '12 Admiralty Way, Lekki Phase 1',
      city: 'Lekki',
      state: 'Lagos',
      phone: '+234 901 234 5678',
      default: false,
    });
  }

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-4'>
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

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Button
            type='button'
            variant='outline'
            className='w-full shadow-none sm:w-auto'
            onClick={fillDummyAddress}
            disabled={isSubmitting}
          >
            Use dummy address
          </Button>

          <div className='flex flex-col gap-3 sm:flex-row sm:gap-x-4'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto'
              onClick={showSelectedAddress}
            >
              Cancel
            </Button>

            <Button type='submit' className='w-full sm:w-34'>
              {isSubmitting ? <Spinner /> : <span>Save</span>}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
