import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { useCreateColor } from '../hooks/useCreateColor';
import { useUpdateColor } from '../hooks/useUpdateColor';

import { useColorFormStore } from '../store/useColorFormStore';

import { colorSchema, type ColorFormValues } from '../schemas/colorSchema';

export default function AdminColorFormDialog() {
  const { isFormOpen, setFormOpen, editingColor, setEditingColor } =
    useColorFormStore();
  const { createColor, isPending: isCreating } = useCreateColor();
  const { updateColor, isPending: isEditing } = useUpdateColor();

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: '',
      code: '#000000',
    },
  });

  const isWorking = isCreating || isEditing || form.formState.isSubmitting;

  useEffect(() => {
    if (editingColor) {
      form.reset(editingColor);
    } else {
      form.reset({
        name: '',
        code: '#000000',
      });
    }
  }, [editingColor, form]);

  function onSubmit(data: ColorFormValues) {
    if (editingColor) {
      updateColor(
        { colorData: data, colorId: editingColor.id },
        {
          onSuccess() {
            setFormOpen(false);
            setEditingColor(null);
          },
        }
      );
    } else {
      createColor(data, {
        onSuccess() {
          form.reset();
          setFormOpen(false);
        },
      });
    }
  }

  function handleCancel() {
    setFormOpen(false);
    setEditingColor(null);
  }

  function handleOpen(isOpen: boolean) {
    if (!isOpen && editingColor) {
      form.reset();
      setEditingColor(null);
    }
    setFormOpen(isOpen);
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={handleOpen}>
      <DialogContent className='sm:max-w-md' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {editingColor ? 'Edit Color' : 'Create Color'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter color name'
                      disabled={isWorking}
                      className='py-5 shadow-none placeholder:text-sm'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Code</FormLabel>
                  <FormControl>
                    <div className='space-y-4 responsive'>
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                      <Input
                        {...field}
                        disabled={isWorking}
                        className='py-5 shadow-none placeholder:text-sm'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-2'>
              <Button
                type='button'
                variant='outline'
                disabled={isWorking}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type='submit' className='w-25' disabled={isWorking}>
                {isWorking ? (
                  <Spinner />
                ) : (
                  <span>{editingColor ? 'Edit' : 'Create'}</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
