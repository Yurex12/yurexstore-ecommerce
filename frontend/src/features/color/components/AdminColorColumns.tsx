import { type ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import type { Color } from '../types';
import { ColorActionsCell } from './ColorActionsCell';
import { DataTableColumnHeader } from '@/components/ui/data-column-header';

export const columns: ColumnDef<Color>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <span className='capitalize'>{row.original.name}</span>,
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => {
      const color = row.original;
      return (
        <div className='flex items-center gap-2'>
          <span>{color.code}</span>
          <span
            className='inline-block h-4 w-4 rounded-full border-b'
            style={{ backgroundColor: color.code }}
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ColorActionsCell color={row.original} />,
  },
];
