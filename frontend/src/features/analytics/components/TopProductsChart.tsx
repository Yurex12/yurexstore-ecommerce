import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { formatCurrency } from '@/lib/helpers';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useTopProducts } from '../hooks/useTopProducts';
import TopProductsChartSkeleton from './TopProductsChartSkeleton';
import { AnalyticsError } from './AnalyticsError';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export default function TopProductsChart() {
  const { topProducts, isPending, error } = useTopProducts();
  if (isPending) return <TopProductsChartSkeleton />;
  if (error)
    return <AnalyticsError title='Top Products' className='h-[470px]' />;

  if (!topProducts) return <p>No data</p>;

  return (
    <Card className='shadow-none rounded-xl border'>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Ranked by total revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[350px] w-full'>
          <BarChart
            accessibilityLayer
            data={topProducts}
            layout='vertical'
            margin={{
              left: 0,
            }}
          >
            <XAxis type='number' hide />

            <YAxis
              dataKey='name'
              type='category'
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                value.length > 20 ? `${value.substring(0, 20)}...` : value
              }
              className='text-xs font-medium'
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='dot'
                  formatter={(value, name) => (
                    <div className='flex items-center gap-2'>
                      <span className='font-bold'>
                        {name === 'revenue'
                          ? formatCurrency(value as number)
                          : value}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Bar
              dataKey='revenue'
              fill='var(--color-revenue)'
              radius={5}
              barSize={32}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
