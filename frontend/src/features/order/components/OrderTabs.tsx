import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useOrderStore } from '../store/useOrderStore';

import { orderStatuses } from '../constants';

export default function OrderTabs() {
  const { status, onChange } = useOrderStore();

  return (
    <Tabs defaultValue={status} className='w-full' onValueChange={onChange}>
      <div className='overflow-x-auto sm:overflow-visible'>
        <TabsList className='flex w-fit gap-2 sm:gap-3 border border-input rounded-xl bg-background p-1 h-10'>
          {orderStatuses.map((orderStatus) => (
            <TabsTrigger
              key={orderStatus.status}
              value={orderStatus.status}
              className='px-4  text-sm font-medium rounded-md data-[state=active]:bg-primary data-[state=active]:text-background transition-all duration-200 whitespace-nowrap'
            >
              {orderStatus.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
