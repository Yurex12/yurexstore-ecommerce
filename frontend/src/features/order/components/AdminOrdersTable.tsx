import { DataTable } from '@/components/ui/data-table';
import type { AdminOrder } from '../types';
import { columns } from './AdminOrderColumns';

export default function AdminOrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className='container'>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
