import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

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
import { Textarea } from '@/components/ui/textarea';

import { useCategories } from '@/features/category/hook/useCategories';
import { useColors } from '@/features/color/hooks/useColors';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useProduct } from '../hooks/useProduct';

import {
  productEditSchema,
  type ProductEditSchema,
} from '../schemas/productEditSchema';

import { MAX_IMAGE_SIZE } from '../constants';
import NoData from '@/components/NoData';
import ErrorState from '@/components/AdminErrorState';
import PageLoader from '@/components/PageLoader';

export default function AdminProductEditForm() {
  const { productId } = useParams();

  const form = useForm({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      name: '',
      price: 0,
      quantity: 0,
      categoryId: '',
      colorId: '',
      description: '',
      gender: 'BOTH',
      images: [],
      productVariants: [],
      variantTypeName: '',
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

  const {
    product,
    isPending: isFetchingProduct,
    error: productError,
  } = useProduct(productId);

  const { uploadImage } = useUploadImage();
  const { updateProduct, isPending: isEditing } = useUpdateProduct();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        gender: product.gender,
        categoryId: product.categoryId,
        colorId: product.colorId,
        images: product.images,
        price: product.price,
        quantity: product.quantity,
        variantTypeName: product.variantTypeName || '',
        productVariants: product.productVariants || [],
      });
    }
  }, [product, form]);

  const hasVariants =
    !!product?.variantTypeName || (product?.productVariants?.length ?? 0) > 0;

  const images = useWatch({ control: form.control, name: 'images' });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: 'productVariants',
  });

  const isWorking = form.formState.isSubmitting || isEditing;

  if (isFetchingCategories || isFetchingColors || isFetchingProduct)
    return <PageLoader />;

  if (productError) return <ErrorState message={productError.message} />;
  if (categoriesError || colorsError) return <ErrorState />;

  if (!categories?.length || !colors?.length)
    return (
      <NoData content='You need at least one category and one color set up before you can add products. Please create them first.' />
    );

  async function onSubmit(data: ProductEditSchema) {
    const needsUpload = data.images?.filter((image) => image instanceof File);

    let res;

    if (needsUpload?.length) {
      res = await Promise.all(
        needsUpload.map((image) => uploadImage(image, 'products')),
      );

      const failed = res.some((item) => item === null);

      if (failed) {
        toast.error('something went wrong, Try again');
        return;
      }
    }

    const existingImages = (data.images || []).filter(
      (img): img is { url: string; fileId: string } => !(img instanceof File),
    );

    const uploadedImages =
      res?.filter(
        (item): item is { url: string; fileId: string } => item !== null,
      ) || [];

    const allImages = [...existingImages, ...uploadedImages];

    updateProduct(
      {
        productData: {
          ...data,
          images: allImages,
        },
        productId: product!.id,
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
          {/* Left column*/}
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
                          disabled={isWorking}
                          placeholder='e.g. Classic White Cotton Shirt'
                          className='py-5 shadow-none placeholder:text-sm'
                          {...field}
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
                          disabled={isWorking}
                          placeholder='Write a short description...'
                          className='h-32 resize-none shadow-none placeholder:text-sm'
                          {...field}
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
                          disabled={isWorking}
                          onValueChange={field.onChange}
                          value={field.value}
                          className='flex gap-4'
                        >
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              disabled={isWorking}
                              value='MALE'
                              id='r1'
                            />
                            <Label htmlFor='r1'>Male</Label>
                          </div>
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              disabled={isWorking}
                              value='FEMALE'
                              id='r2'
                            />
                            <Label htmlFor='r2'>Female</Label>
                          </div>
                          <div className='flex items-center gap-2'>
                            <RadioGroupItem
                              disabled={isWorking}
                              value='BOTH'
                              id='r3'
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

            <div className='rounded-md bg-background p-4 border space-y-4'>
              <h3 className='text-lg font-medium'>Product Variants</h3>

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
                            disabled={isWorking}
                            placeholder='0.00'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
                            value={field.value as number}
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
                            disabled={isWorking}
                            placeholder='0'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
                            value={field.value as number}
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
                            disabled={isWorking}
                            placeholder='Size'
                            className='py-5 shadow-none placeholder:text-sm'
                            {...field}
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
                                        disabled={isWorking}
                                        placeholder='e.g. Small'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
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
                                        disabled={isWorking}
                                        placeholder='0.00'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
                                        value={field.value as number}
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
                                        disabled={isWorking}
                                        placeholder='0'
                                        className='shadow-none placeholder:text-sm'
                                        {...field}
                                        value={field.value as number}
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

          <div className='lg:col-span-2 space-y-6'>
            {/* Category & Color */}
            <div className='rounded-md bg-background p-4 border space-y-4'>
              <h3 className='text-lg font-medium'>Category & Color</h3>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem key={field.value}>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isWorking}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          disabled={isWorking}
                          className='shadow-none w-full'
                        >
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              disabled={isWorking}
                            >
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
                  <FormItem key={field.value}>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isWorking}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          disabled={isWorking}
                          className='shadow-none w-full'
                        >
                          <SelectValue placeholder='Select color' />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem
                              key={color.id}
                              value={color.id}
                              disabled={isWorking}
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
                    {!images || images.length === 0 ? (
                      <label className='flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/40 w-full'>
                        <span className='text-2xl font-bold'>+</span>
                        <span className='text-sm text-muted-foreground'>
                          Upload image
                        </span>
                        <input
                          disabled={isWorking}
                          type='file'
                          accept='image/*'
                          multiple
                          className='hidden'
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files || []);
                            field.onChange(newFiles.slice(0, 4));
                            e.target.value = '';
                          }}
                        />
                      </label>
                    ) : (
                      <div className='grid grid-cols-2 gap-3'>
                        {images.map((image, index) => {
                          const isFile = image instanceof File;
                          const url = isFile
                            ? URL.createObjectURL(image)
                            : image.url;
                          const isLarge = isFile && image.size > MAX_IMAGE_SIZE;

                          return (
                            <div key={index} className='relative w-full h-40'>
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                onLoad={() => {
                                  if (isFile) URL.revokeObjectURL(url);
                                }}
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
                                disabled={isWorking}
                                onClick={() =>
                                  field.onChange(
                                    images.filter((_, i) => i !== index),
                                  )
                                }
                                className='absolute top-1 right-1 bg-black/50 rounded-full p-1'
                              >
                                <X className='w-4 h-4 text-white' />
                              </button>
                            </div>
                          );
                        })}

                        {images.length < 4 && (
                          <label className='flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/40'>
                            <span className='text-2xl font-bold'>+</span>
                            <span className='text-sm text-muted-foreground'>
                              Upload
                            </span>
                            <input
                              disabled={isWorking}
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
            onClick={() => form.reset({ ...product, variantTypeName: '' })}
            variant='outline'
            className='w-25'
            disabled={isWorking}
          >
            Cancel
          </Button>
          <Button type='submit' className='w-30' disabled={isWorking}>
            {isWorking ? <Spinner /> : <span>Edit Product</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
