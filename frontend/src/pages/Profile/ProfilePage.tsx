import { Edit } from 'lucide-react';

import useUser from '@/features/auth/hooks/useUser';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function ProfilePage() {
  const { user, isPending, error } = useUser();

  if (isPending) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!user) return <p>Something went wrong</p>;

  return (
    <div className='p-4 lg:p-8 space-y-6'>
      <div className='border-b pb-4 border-input'>
        <h2 className='text-xl font-semibold text-foreground'>
          Profile Information
        </h2>
      </div>

      <Card className='rounded-xl border-0 bg-background'>
        <CardHeader className='flex items-center justify-between'>
          <CardTitle className='text-lg font-medium text-foreground/90'>
            User Details
          </CardTitle>
          <Button variant='outline' size='sm'>
            <Edit />
          </Button>
        </CardHeader>
        <CardContent className='space-y-2 text-sm text-muted-foreground'>
          <p>
            <span className='font-medium text-foreground/90'>Name: </span>
            {user.name}
          </p>
          <p>
            <span className='font-medium text-foreground/90'>Email: </span>
            {user.email}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
