import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileCard() {
  return (
    <Card className='flex-1 border-0 rounded-xl py-6 lg:py-10 bg-background'>
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
  );
}
