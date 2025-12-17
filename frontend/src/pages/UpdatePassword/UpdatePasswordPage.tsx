import { Separator } from '@/components/ui/separator';
import UpdatePasswordForm from '@/features/auth/components/UpdatePasswordForm';

export default function UpdatePasswordPage() {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>Update Password</h2>

      <Separator />

      <UpdatePasswordForm />
    </div>
  );
}
