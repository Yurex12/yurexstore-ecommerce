import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';

import { useCategories } from '@/features/category/hook/useCategories';
import { useColors } from '@/features/color/hooks/useColors';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useCreateProduct } from '../hooks/useCreateProduct';

import { MAX_IMAGE_SIZE } from '../constants';

import ErrorState from '@/components/AdminErrorState';
import NoData from '@/components/NoData';
import PageLoader from '@/components/PageLoader';
import {
  productCreateSchema,
  type ProductCreateSchema,
} from '../schemas/productCreateSchema';
import { useNavigate } from 'react-router-dom';

export default function AdminProductCreateForm() {
  const form = useForm({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: '',
      hasVariants: false,
      price: '',
      quantity: 1,
      categoryId: '',
      colorId: '',
      description: '',
      gender: 'BOTH',
      images: [],
    },
  });

  const {
    categories,
    isPending: isFetchingCategories,
    error: categoriesError,
  } = useCategories();
  const {
    colors,
    isPending: isFetchingColors,
    error: colorsError,
  } = useColors();
  const { createProduct, isPending: isCreating } = useCreateProduct();

  const { uploadImage } = useUploadImage();

  const hasVariants = useWatch({ control: form.control, name: 'hasVariants' });
  const images = useWatch({ control: form.control, name: 'images' });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: 'productVariants',
  });

  const navigate = useNavigate();

  const isWorking = isCreating || form.formState.isSubmitting;

  useEffect(() => {
    if (hasVariants) {
      if (fields.length === 0) {
        append({ value: '', price: '', quantity: 1 });
      }
    } else {
      form.setValue('variantTypeName', '');
      form.setValue('productVariants', []);
    }
  }, [hasVariants, fields.length, append, form]);

  if (isFetchingCategories || isFetchingColors) return <PageLoader />;
  if (categoriesError || colorsError) return <ErrorState />;
  if (!categories?.length || !colors?.length)
    return (
      <NoData content='You need at least one category and one color set up before you can add products. Please create them first.' />
    );

  async function onSubmit(data: ProductCreateSchema) {
    const res = await Promise.all(
      data.images.map((image) => uploadImage(image, 'products')),
    );

    const failed = res.some((item) => item === null);

    if (failed) {
      toast.error('something went wrong, Try again');
      return;
    }

    const uploadedImages = res.filter(
      (item): item is { url: string; fileId: string } => item !== null,
    );

    createProduct(
      {
        ...data,
        images: uploadedImages,
      },
      {
        onSuccess() {
          form.reset();
          navigate('/admin/products');
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
          {/* Left column - 60% (3 cols) */}
          <div className='lg:col-span-3 space-y-6'>
            {/*  Product Details*/}
            <div className='rounded-md bg-background p-4 border'>
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Product Details</h3>

                {/* Name */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g. Classic White Cotton Shirt'
                          className='py-5 shadow-none placeholder:text-sm'
                          {...field}
                          disabled={isWorking}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Write a short description...'
                          className='h-32 resize-none shadow-none placeholder:text-sm'
                          {...field}
                          disabled={isWorking}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          defaultValue='BOTH'
                          onValueChange={field.onChange}
                          value={field.value}
                          className='flex gap-4'
                        >
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              value='MALE'
                              id='r1'
                              disabled={isWorking}
                            />
                            <Label htmlFor='r1'>Male</Label>
                          </div>
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              value='FEMALE'
                              id='r2'
                              disabled={isWorking}
                            />
                            <Label htmlFor='r2'>Female</Label>
                          </div>
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              value='BOTH'
                              id='r3'
                              disabled={isWorking}
                            />
                            <Label htmlFor='r3'>Both</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Variants */}
            <div className='rounded-md bg-background p-4 border space-y-4'>
              <h3 className='text-lg font-medium'>Product Variants</h3>
              <FormField
                control={form.control}
                name='hasVariants'
                render={({ field }) => (
                  <FormItem className='flex items-center'>
                    <FormLabel>Has Variants?</FormLabel>
                    <FormControl>
                      <Checkbox
                        className='border-primary'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isWorking}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {!hasVariants && (
                <div className='grid grid-cols-2 gap-4 items-start'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='0.00'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
                            value={field.value as number}
                            disabled={isWorking}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='quantity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='0'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
                            value={field.value as number}
                            disabled={isWorking}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {hasVariants && (
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='variantTypeName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Variant Type (e.g., Size, Material)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Size'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
                            disabled={isWorking}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Variants Table */}
                  <div className='overflow-x-auto'>
                    <table className='w-full table-auto align-top text-sm'>
                      <thead>
                        <tr className='text-left'>
                          <th className='w-1/3 px-2 py-2'>Value</th>
                          <th className='w-1/3 px-2 py-2'>Price</th>
                          <th className='w-1/3 px-2 py-2'>Quantity</th>
                          <th className='w-[50px]'></th>
                        </tr>
                      </thead>

                      <tbody>
                        {fields.map((field, index) => (
                          <tr key={field.id} className='border-t align-top'>
                            <td className='px-2 py-3'>
                              <FormField
                                control={form.control}
                                name={`productVariants.${index}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder='e.g. Small'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
                                        disabled={isWorking}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className='px-2 py-3'>
                              <FormField
                                control={form.control}
                                name={`productVariants.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder='0.00'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
                                        value={field.value as number}
                                        disabled={isWorking}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className='px-2 py-3'>
                              <FormField
                                control={form.control}
                                name={`productVariants.${index}.quantity`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder='0'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
                                        value={field.value as number}
                                        disabled={isWorking}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </td>
                            <td className='px-2 py-3'>
                              <Button
                                type='button'
                                size='sm'
                                variant='ghost'
                                onClick={() => remove(index)}
                                disabled={fields.length === 1 || isWorking}
                              >
                                <X className='text-destructive' />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='flex justify-end'>
                    <Button
                      type='button'
                      variant='default'
                      size='sm'
                      onClick={() =>
                        append({ value: '', price: '', quantity: 1 })
                      }
                      disabled={isWorking}
                    >
                      <Plus size={16} />
                      Add variant
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Category & Color */}
            <div className='rounded-md bg-background p-4 border space-y-4'>
              <h3 className='text-lg font-medium'>Category & Color</h3>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isWorking}
                      >
                        <SelectTrigger
                          className='shadow-none w-full'
                          disabled={isWorking}
                        >
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='colorId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isWorking}
                      >
                        <SelectTrigger
                          className='shadow-none w-full'
                          disabled={isWorking}
                        >
                          <SelectValue placeholder='Select color' />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem
                              key={color.id}
                              value={color.id}
                              className='capitalize'
                            >
                              {color.name}
                              <span
                                className='inline-block size-4 rounded-full border-b'
                                style={{ backgroundColor: color.code }}
                              />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <div className='rounded-md bg-background p-4 border space-y-4'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-medium'>Images</h3>
                <p className='text-sm text-gray-500'>(Max 4)</p>
              </div>

              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    {images.length === 0 ? (
                      <label className='flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/40 w-full'>
                        <span className='text-2xl font-bold'>+</span>
                        <span className='text-sm text-muted-foreground'>
                          Upload image
                        </span>
                        <input
                          type='file'
                          accept='image/*'
                          multiple
                          className='hidden'
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files || []);
                            field.onChange(newFiles.slice(0, 4));
                            e.target.value = '';
                          }}
                          disabled={isWorking}
                        />
                      </label>
                    ) : (
                      <div className='grid grid-cols-2 gap-3'>
                        {images.map((file, index) => {
                          const url = URL.createObjectURL(file);
                          const isLarge = file.size > MAX_IMAGE_SIZE;
                          return (
                            <div key={index} className='relative w-full h-40'>
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                onLoad={() => URL.revokeObjectURL(url)}
                                className={`object-cover rounded-lg size-full border ${
                                  isLarge ? 'opacity-40' : ''
                                }`}
                              />
                              {isLarge && (
                                <div className='absolute inset-0 flex items-center justify-center'>
                                  <p className='rounded-lg text-xs bg-red-500 px-3 py-1 text-white'>
                                    Image too large (max 1MB)
                                  </p>
                                </div>
                              )}
                              <button
                                type='button'
                                onClick={() =>
                                  field.onChange(
                                    images.filter((_, i) => i !== index),
                                  )
                                }
                                className='absolute top-1 right-1 bg-black/50 rounded-full p-1'
                                disabled={isWorking}
                              >
                                <X className='w-4 h-4 text-white' />
                              </button>
                            </div>
                          );
                        })}

                        {images.length < 4 && (
                          <label className='flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/40'>
                            <span className='text-2xl font-bold'>+</span>
                            <span className='text-sm text-muted-foreground'>
                              Upload
                            </span>
                            <input
                              type='file'
                              accept='image/*'
                              multiple
                              className='hidden'
                              onChange={(e) => {
                                const newFiles = Array.from(
                                  e.target.files || [],
                                );
                                field.onChange(
                                  [...images, ...newFiles].slice(0, 4),
                                );
                                e.target.value = '';
                              }}
                              disabled={isWorking}
                            />
                          </label>
                        )}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            onClick={() => form.reset()}
            variant='outline'
            className='w-25'
            disabled={isWorking}
          >
            Cancel
          </Button>
          <Button type='submit' className='w-35'>
            {isWorking ? <Spinner /> : <span>Create Product</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
