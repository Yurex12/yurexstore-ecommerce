import { type ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/ui/data-column-header';
import type { Category } from '../types';
import CategoryActionsCell from './CategoryActionsCell';

export const columns: ColumnDef<Category>[] = [
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
  },

  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className='flex items-center'>
          <img
            src={category.image}
            alt={category.name}
            className='w-12 h-12 object-cover rounded-md'
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryActionsCell category={row.original} />,
  },
];
