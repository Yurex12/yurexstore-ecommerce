import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';

import { useUploadImage } from '@/hooks/useUploadImage';
import { useEffect } from 'react';
import { useUpdateCategory } from '../hook/useUpdateCategory';
import {
  editCategorySchema,
  type EditCategoryFormValues,
} from '../schemas/categorySchema';
import { useCategoryEditStore } from '../store/useCategoryEditStore';
import toast from 'react-hot-toast';
import type { Category } from '../types';

export default function AdminCategoryEditDialog() {
  const { isFormOpen, setFormOpen, editingCategory, setEditingCategory } =
    useCategoryEditStore();

  const { updateCategory, isPending: isEditing } = useUpdateCategory();

  const { uploadImage } = useUploadImage();

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
  });

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        ...editingCategory,
        image: undefined,
      });
    }
  }, [form, editingCategory]);

  const isWorking = form.formState.isSubmitting || isEditing;

  async function onSubmit(data: EditCategoryFormValues) {
    try {
      const updateData: Partial<Omit<Category, 'slug' | 'id'>> = {
        name: data.name,
        description: data.description,
      };

      if (data.image) {
        const res = await uploadImage(data.image, 'categories');
        if (!res) return null;
        updateData.image = res.url;
        updateData.fileId = res.fileId;
      }

      updateCategory(
        {
          categoryData: updateData,
          categoryId: editingCategory!.id,
        },
        {
          onSuccess() {
            form.reset();
            setEditingCategory(null);
            setFormOpen(false);
          },
        }
      );
    } catch {
      toast.error('Category update failed');
    }
  }

  function handleCancel() {
    setFormOpen(false);
    setEditingCategory(null);
  }

  function handleOpen(isOpen: boolean) {
    if (!isOpen && editingCategory) {
      form.reset();
      setEditingCategory(null);
    }
    setFormOpen(isOpen);
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={handleOpen}>
      <DialogContent className='sm:max-w-md' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
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
                      placeholder='Enter category name'
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter category description'
                      disabled={isWorking}
                      className='shadow-none placeholder:text-sm resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isWorking}
                      className=' pt-2  pb-8 shadow-none placeholder:text-sm'
                      accept='image/png'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      type='file'
                    />
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
                {isWorking ? <Spinner /> : <span>Edit</span>}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
