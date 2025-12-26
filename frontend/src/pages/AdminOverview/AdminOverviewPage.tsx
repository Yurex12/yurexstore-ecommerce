import OverviewChart from '@/features/analytics/components/OverviewChart';
import MetricsList from '../../features/analytics/components/MetricsList';
import TopProductsChart from '@/features/analytics/components/TopProductsChart';

export default function AdminOverviewPage() {
  return (
    <div className='space-y-4'>
      <MetricsList />
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='md:col-span-8'>
          <OverviewChart />
        </div>
        <div className='md:col-span-4'>
          <TopProductsChart />
        </div>
      </div>
    </div>
  );
}
