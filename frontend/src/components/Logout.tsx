import useSignOut from '@/features/auth/hooks/useSignOut';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { signOut, isPending } = useSignOut();
  const navigate = useNavigate();

  function handleLogout() {
    signOut(undefined, {
      onSuccess() {
        navigate('/login');
      },
    });
  }
  return (
    <Button disabled={isPending} onClick={handleLogout}>
      Logout
    </Button>
  );
}
