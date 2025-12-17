import type { ComponentProps } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function ResetSearchParams({
  className,
}: ComponentProps<'button'>) {
  const [_, setSearchParams] = useSearchParams();

  const resetAllParams = () => setSearchParams(new URLSearchParams());
  return (
    <Button className={className} onClick={resetAllParams}>
      Reset
    </Button>
  );
}
