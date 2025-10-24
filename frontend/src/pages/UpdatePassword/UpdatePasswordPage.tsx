import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function UpdatePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password validation and update logic here
    console.log({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>Update Password</h2>

      <Separator />

      <Card className='rounded-xl border bg-background shadow-sm max-w-md'>
        <CardHeader>
          <CardTitle className='text-lg font-medium text-foreground/90'>
            Change Your Password
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-foreground/90 mb-1'>
                Current Password
              </label>
              <Input
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='Enter current password'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm font-medium text-foreground/90 mb-1'>
                New Password
              </label>
              <Input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm font-medium text-foreground/90 mb-1'>
                Confirm New Password
              </label>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
              />
            </div>

            <Button type='submit' className='w-full'>
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
