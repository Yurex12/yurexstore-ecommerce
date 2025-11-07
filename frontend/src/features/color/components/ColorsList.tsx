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
import { Ellipsis } from 'lucide-react';
import { useColors } from '../hooks/useColors';
import { useColorFormStore } from '../store/useColorFormStore';
import { useColorDeleteStore } from '../store/useColorDeleteStore';

export default function ColorsList() {
  const { colors, error, isPending: isFetchingColor } = useColors();

  const { setSelectedColorId, setDeleteDialogOpen } = useColorDeleteStore();
  const { setEditingColor, setFormOpen } = useColorFormStore();

  if (isFetchingColor) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!colors?.length) return <EmptyState />;

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
                    <DropdownMenuItem
                      onClick={() => {
                        setFormOpen(true);
                        setEditingColor(color);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        setSelectedColorId(color.id);
                      }}
                    >
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
