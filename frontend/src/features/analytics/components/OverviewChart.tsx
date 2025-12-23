import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/lib/helpers';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useChartData } from '../hooks/useChartData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-2)',
  },
  orders: {
    label: 'Orders',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export const description = 'A stacked area chart';

export function OverviewChart() {
  const { chartData, isPending, error } = useChartData();

  if (isPending) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  if (!chartData) return <p>No data</p>;
  return (
    <Card className='shadow-none rounded-xl border'>
      <CardHeader>
        <CardTitle>Revenue & Orders</CardTitle>
        <CardDescription>
          Daily performance over the last 7 days
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='aspect-[auto] h-[350px] w-full'
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <YAxis yAxisId='rev' hide />
            <YAxis yAxisId='ord' hide />
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className='text-xs font-medium text-gray-400'
              interval={0}
              padding={{ left: 20, right: 20 }}
              hide={false}
            />

            <ChartTooltip
              cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  indicator='dot'
                  formatter={(value, name) => (
                    <div className='flex w-full items-center justify-between gap-4'>
                      <span className='text-xs text-muted-foreground'>
                        {chartConfig[name as keyof typeof chartConfig]?.label}
                      </span>
                      <span className='text-xs font-bold'>
                        {name === 'revenue'
                          ? formatCurrency(value as number)
                          : value}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Area
              dataKey='revenue'
              yAxisId='rev'
              stackId='1'
              type='natural'
              stroke='var(--color-revenue)'
              fill='var(--color-revenue)'
              baseValue={0}
              dot={{
                r: 3,
                fill: 'var(--color-revenue)',
                fillOpacity: 1,
                strokeWidth: 0,
              }}
              activeDot={{ r: 5 }}
              fillOpacity={0.4}
            />

            <Area
              dataKey='orders'
              yAxisId='ord'
              stackId='2'
              type='natural'
              stroke='var(--color-orders)'
              fill='var(--color-orders)'
              fillOpacity={0.4}
              dot={{
                r: 3,
                fill: 'var(--color-orders)',
                fillOpacity: 1,
                strokeWidth: 0,
              }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
