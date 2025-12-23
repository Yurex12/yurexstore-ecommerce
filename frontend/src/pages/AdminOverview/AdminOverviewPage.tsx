import { OverviewChart } from '@/features/analytics/components/OverviewChart';
import MetricsList from '../../features/analytics/components/MetricsList';

export default function AdminOverviewPage() {
  return (
    <div className='space-y-6'>
      <MetricsList />
      <OverviewChart />
    </div>
  );
}
