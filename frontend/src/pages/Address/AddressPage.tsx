import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Address = {
  id: string;
  name: string;
  street: string;
  area: string;
  city: string;
  phone1: string;
  phone2?: string;
  isDefault: boolean;
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Ekungomi Adeyemi',
      street: '06, Peace Street',
      area: 'Aanuolwapo Estate, Igbe Laara, Ikorodu',
      city: 'Ikorodu-Garage, Lagos',
      phone1: '+234 9016758057',
      phone2: '+234 9152024536',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Jane Doe',
      street: '12, Oluyole Estate',
      area: 'Ikorodu',
      city: 'Lagos',
      phone1: '+234 9012345678',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const handleEdit = (id: string) => console.log('Edit', id);
  const handleDelete = (id: string) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  const handleAddNew = () => console.log('Add New Address');

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>
          Addresses ({addresses.length})
        </h2>
        <Button onClick={handleAddNew}>Add New Address</Button>
      </div>

      <Separator />

      {/* Addresses List */}
      <div className='space-y-4'>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className='border rounded-lg p-4 bg-background shadow-sm'
          >
            {/* Address details */}
            <div className='space-y-1'>
              <p className='font-medium text-foreground'>{addr.name}</p>
              <p className='text-sm text-muted-foreground'>
                {addr.street}, {addr.area}
              </p>
              <p className='text-sm text-muted-foreground'>{addr.city}</p>
              <p className='text-sm text-muted-foreground'>
                {addr.phone1}
                {addr.phone2 ? ` / ${addr.phone2}` : ''}
              </p>
            </div>

            {/* Default badge */}
            {addr.isDefault && (
              <Badge className='mt-4 rounded px-2'>Default</Badge>
            )}

            <Separator className='my-2' />

            {/* Actions */}
            <div className='flex items-center gap-2 justify-between'>
              <button
                onClick={() => handleSetDefault(addr.id)}
                disabled={addr.isDefault}
                className='font-semibold text-primary/70 bg-primary/5
                text-sm py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:text-foreground/20'
              >
                Set as Default
              </button>

              <div className='flex gap-x-4'>
                <Button
                  size='sm'
                  variant='secondary'
                  className='text-primary'
                  onClick={() => handleEdit(addr.id)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size='sm'
                  variant='secondary'
                  className='text-primary'
                  onClick={() => handleDelete(addr.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
