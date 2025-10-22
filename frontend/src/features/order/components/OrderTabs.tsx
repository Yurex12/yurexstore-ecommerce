import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { orderStatus } from '../constants';
import { useOrderStore } from '../store/useOrderStore';

export default function OrderTabs() {
  const { value, onChange } = useOrderStore();

  return (
    <Tabs defaultValue={value} className='w-full' onValueChange={onChange}>
      <div className='overflow-x-auto sm:overflow-visible'>
        <TabsList className='flex w-fit gap-2 sm:gap-3 border border-input rounded-xl bg-background p-1 h-10'>
          {orderStatus.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='px-4  text-sm font-medium rounded-md data-[state=active]:bg-primary data-[state=active]:text-background transition-all duration-200 whitespace-nowrap'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
