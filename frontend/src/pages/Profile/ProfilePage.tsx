import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export default function ProfilePage() {
  // You can replace this with real user data from your state or API
  const user = {
    name: 'Yusuf Ekungomi',
    email: 'ekungomiadeyemi@gmail.com',
  };

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
