import { Ellipsis } from 'lucide-react';

import EmptyState from '@/components/EmptyState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useColors } from '../hooks/useColors';

import { useColorDeleteStore } from '../store/useColorDeleteStore';
import { useColorFormStore } from '../store/useColorFormStore';

import type { Color } from '../types';

export default function AdminColorsList() {
  const { colors, error, isPending: isFetchingColor } = useColors();

  const { setSelectedColorId, setDeleteDialogOpen } = useColorDeleteStore();
  const { setEditingColor, setFormOpen } = useColorFormStore();

  if (isFetchingColor) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!colors?.length) return <EmptyState />;

  function handleDelete(colorId: string) {
    setDeleteDialogOpen(true);
    setSelectedColorId(colorId);
  }

  function handleEdit(color: Color) {
    setFormOpen(true);
    setEditingColor(color);
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[40%]'>Name</TableHead>
            <TableHead className='w-[40%]'>Value</TableHead>
            <TableHead className='w-[20%] text-right'>Edit / Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {colors.map((color) => (
            <TableRow key={color.id} className='border-b h-15'>
              <TableCell>{color.name}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>{color.code}</span>
                  <span
                    className='inline-block h-4 w-4 rounded-full border-b'
                    style={{ backgroundColor: color.code }}
                  />
                </div>
              </TableCell>
              <TableCell className='text-right space-x-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='ml-8'>
                    <Ellipsis className='text-2xl' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(color)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(color.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
