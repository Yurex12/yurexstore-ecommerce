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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  updatePasswordSchema,
  type UpdatePasswordSchema,
} from '../schemas/changePasswordSchema';
import useUpdatePassword from '../hooks/useUpdatePassword';
import { Spinner } from '@/components/ui/spinner';

export default function UpdatePasswordForm() {
  const { updatePassword, isPending } = useUpdatePassword();
  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: UpdatePasswordSchema) {
    updatePassword({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  }

  const isSubmitting = isPending || form.formState.isSubmitting;

  return (
    <Card className='rounded-xl border bg-background shadow-sm max-w-md'>
      <CardHeader>
        <CardTitle className='text-lg font-medium text-foreground/90'>
          Change Your Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter current password'
                      className='py-5 shadow-none placeholder:text-sm'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={isSubmitting}
                      placeholder='Enter new password'
                      className='py-5 shadow-none placeholder:text-sm'
                      {...field}
                    />
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={isSubmitting}
                      placeholder='Confirm new password'
                      className='py-5 shadow-none placeholder:text-sm'
                      {...field}
                    />
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
