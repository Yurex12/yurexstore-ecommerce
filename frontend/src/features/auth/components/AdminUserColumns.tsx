import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-column-header';
import { format } from 'date-fns';
import type { User } from '../types';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Joined' />
    ),
    cell: ({ cell }) =>
      format(new Date(cell.row.original.createdAt), 'dd-MM-yyyy'),
  },
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },
];
