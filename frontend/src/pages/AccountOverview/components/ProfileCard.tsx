import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileCard() {
  return (
    <Card className='border border-input rounded-xl hover:shadow-md transition-shadow shadow-none duration-200 flex-1'>
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
