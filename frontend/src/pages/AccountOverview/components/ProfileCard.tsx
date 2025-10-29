import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import useUser from '@/features/auth/hooks/useUser';

export default function ProfileCard() {
  const { user, isPending, error } = useUser();

  if (isPending) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!user) return null;

  return (
    <Card className='border border-input rounded-xl hover:shadow-md transition-shadow shadow-none duration-200 flex-1'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='font-semibold text-lg text-foreground/90'>
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='text-foreground/80'>{user.name}</p>
        <p className='text-muted-foreground'>{user.email}</p>
      </CardContent>
    </Card>
  );
}
