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
import { DialogClose } from '@radix-ui/react-dialog';
import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useCreateCategory } from '../hook/useCreateCategory';
import {
  createCategorySchema,
  type CategoryFormValues,
} from '../schemas/categorySchema';

export default function AdminCreateCategoryDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { createCategory, isPending: isCreating } = useCreateCategory();

  const { uploadImage } = useUploadImage();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
  });

  const isWorking = isCreating || form.formState.isSubmitting;

  async function onSubmit(data: CategoryFormValues) {
    try {
      const res = await uploadImage(data.image, 'categories');
      if (!res) return null;
      createCategory(
        { ...data, image: res.url, fileId: res.fileId },
        {
          onSuccess() {
            form.reset();
            setOpen(false);
          },
        },
      );
    } catch {
      toast.error('Category creation failed');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
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
                      accept='image/*'
                      ref={field.ref}
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
              <DialogClose asChild>
                <Button type='button' variant='outline' disabled={isWorking}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' className='w-25' disabled={isWorking}>
                {isWorking ? <Spinner /> : <span>Create</span>}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
