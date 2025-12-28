import useUser from '@/features/auth/hooks/useUser';

export function useAuthAction() {
  const { user } = useUser();

  function performAction(action: VoidFunction, onAuthRequired: VoidFunction) {
    if (user) action();
    else onAuthRequired();
  }
  return { performAction };
}
