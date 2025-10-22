import { Edit, MapPin } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AddressCard() {
  return (
    <Card className='border border-input rounded-xl hover:shadow-md transition-shadow shadow-none duration-200 flex-1'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='font-semibold text-lg text-foreground/90'>
          Address Book
        </CardTitle>
        <Button variant='secondary' className='cursor-pointer'>
          <Edit />
        </Button>
      </CardHeader>

      <CardContent className='text-sm text-muted-foreground'>
        <div className='flex items-start gap-3'>
          <MapPin className='size-5 text-primary mt-0.5' />
          <div className='space-y-1'>
            <p className='text-base font-medium text-foreground/90'>
              Default Shipping Address
            </p>
            <p>Ekungomi Adeyemi</p>
            <p>06, Peace Street, Aanuolwapo Estate, Igbe Laara, Ikorodu</p>
            <p>Ikorodu-Garage, Lagos</p>
            <p className='mt-1'>+234 9016758057</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
