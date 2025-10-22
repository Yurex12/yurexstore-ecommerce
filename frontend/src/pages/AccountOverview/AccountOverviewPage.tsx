import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, MapPin } from 'lucide-react';

export default function AccountOverviewPage() {
  return (
    <div className='space-y-6 p-4 lg:p-8'>
      {/* Title */}
      <div className='border-b pb-4 border-foreground/30'>
        <h2 className='text-xl font-semibold text-foreground'>
          Account Overview
        </h2>
      </div>

      <div className='flex flex-col lg:flex-row gap-4 '>
        {/* User Info */}
        <Card className='flex-1 shadow border-0 rounded-xl py-6 lg:py-10 bg-background'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='font-semibold text-lg text-foreground/90'>
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <p className='text-foreground/80'>Yusuf Ekungomi</p>
            <p className='text-muted-foreground'>ekungomiadeyemi@gmail.com</p>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className='flex-1 border-0 rounded-xl py-6 lg:py-10 bg-background shadow'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='font-semibold text-lg text-foreground/90'>
              Address Book
            </CardTitle>
            <Edit />
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
      </div>
    </div>
  );
}
