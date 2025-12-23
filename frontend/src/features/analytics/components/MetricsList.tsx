import {
  calculatePercentageChange,
  formatCurrency,
  formatPercentage,
} from '@/lib/helpers';
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Minus,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import { useMetrics } from '../hooks/useMetrics';
import { AnalyticsError } from './AnalyticsError';
import MetricsListSkeleton from './MetricsListSkeleton';

export default function MetricsList() {
  const { metrics, isPending, error } = useMetrics();

  if (isPending) return <MetricsListSkeleton />;
  if (error)
    return <AnalyticsError title='Dashboard Metrics' className='h-[140px]' />;
  if (!metrics) return <p>No data found</p>;

  const revenueChange = calculatePercentageChange(
    metrics.revenue.last7Days,
    metrics.revenue.last14Days
  );

  const ordersChange = calculatePercentageChange(
    metrics.orders.last7Days,
    metrics.orders.last14Days
  );

  const aovChange = calculatePercentageChange(
    metrics.averageOrderValue.last7Days,
    metrics.averageOrderValue.last14Days
  );

  const formattedMetrics = [
    {
      title: 'Revenue',
      value: formatCurrency(metrics.revenue.last7Days),
      change: revenueChange,
      icon: DollarSign,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Orders',
      value: metrics.orders.last7Days.toLocaleString(),
      change: ordersChange,
      icon: ShoppingCart,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(metrics.averageOrderValue.last7Days),
      change: aovChange,
      icon: TrendingUp,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {formattedMetrics.map((metric) => {
        const Icon = metric.icon;
        const change = metric.change;

        const isPositive = change > 0;
        const isNegative = change < 0;
        const isNeutral = change === 0;

        const trendColor = isPositive
          ? 'text-green-500'
          : isNegative
          ? 'text-red-500'
          : 'text-gray-400';
        const TrendIcon = isPositive
          ? ArrowUpRight
          : isNegative
          ? ArrowDownRight
          : Minus;

        return (
          <div key={metric.title} className='rounded-xl border p-4'>
            <div className='mb-3 flex items-start justify-between'>
              <div>
                <h3 className='mb-1 text-sm font-medium text-gray-600'>
                  {metric.title}
                </h3>
                <p className='text-xs text-gray-400'>Last 7 Days</p>
              </div>

              <div
                className={`${metric.iconBg} ${metric.iconColor} rounded-lg p-3`}
              >
                <Icon className='h-6 w-6' />
              </div>
            </div>

            <div className='mt-4'>
              <p className='mb-2 text-4xl font-bold text-gray-900'>
                {metric.value}
              </p>

              <div className='flex items-center gap-1.5'>
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                <span className={`text-sm font-semibold ${trendColor}`}>
                  {isNeutral ? '0.0%' : formatPercentage(change)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
