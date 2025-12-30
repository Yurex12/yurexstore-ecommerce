import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

import {
  updatePasswordSchema,
  type UpdatePasswordSchema,
} from '../schemas/changePasswordSchema';
import useUpdatePassword from '../hooks/useUpdatePassword';
import useUser from '../hooks/useUser';
import toast from 'react-hot-toast';

export default function UpdatePasswordForm() {
  const { updatePassword, isPending } = useUpdatePassword();

  const { user } = useUser();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: UpdatePasswordSchema) {
    if (user?.role === 'ADMIN') {
      toast.error('Why do you want to change the admin password 🥴');
      return;
    }
    if (user?.email.toLocaleLowerCase() === 'johndoe@gmail.com') {
      toast.error(`Why do you want to change John Doe's admin password 🥴`);
      return;
    }
    updatePassword({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  }

  const isSubmitting = isPending || form.formState.isSubmitting;

  return (
    <Card className='max-w-md rounded-xl border bg-background shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-medium text-foreground/90'>
          Change Your Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {/* Old password */}
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showCurrent ? 'text' : 'password'}
                        placeholder='Enter current password'
                        className='py-5 pr-10 shadow-none placeholder:text-sm'
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowCurrent((v) => !v)}
                        disabled={isSubmitting}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      >
                        {showCurrent ? (
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

            {/* New password */}
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNew ? 'text' : 'password'}
                        placeholder='Enter new password'
                        className='py-5 pr-10 shadow-none placeholder:text-sm'
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowNew((v) => !v)}
                        disabled={isSubmitting}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      >
                        {showNew ? (
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

            {/* Confirm password */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder='Confirm new password'
                        className='py-5 pr-10 shadow-none placeholder:text-sm'
                        disabled={isSubmitting}
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirm((v) => !v)}
                        disabled={isSubmitting}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      >
                        {showConfirm ? (
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

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <span>Update Password</span>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
