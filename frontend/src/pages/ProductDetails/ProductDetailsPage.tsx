import { Link, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import { PageLoader } from '@/components/PageLoader';
import ProductImageCarousel from '@/features/product/components/ProductDetailsImageCarousel';
import ProductInfo from '@/features/product/components/ProductInfo';
import ProductReview from '@/features/product/components/ProductReviews';
import { useProduct } from '@/features/product/hooks/useProduct';
import SimilarProductsList from '@/features/product/components/SimilarProductsList';

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const { product, isPending, error } = useProduct(productId);

  if (isPending) return <PageLoader message='Loading product...' />;
  if (error) return <InlineError message={error.message} />;
  if (!product) return <EmptyState message='Product not found' />;
  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4 mb-4'>
        <Link
          to='/shop'
          className='flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm'
        >
          <ArrowLeft />
          <span>Back</span>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <ProductImageCarousel images={product.images} />

        <ProductInfo product={product} />
      </div>

      <div className='md:w-1/2'>
        <ProductReview productId={product.id} />
      </div>

      <div>
        <h2 className='text-xl font-semibold'>Similar Products</h2>

        <SimilarProductsList
          categoryId={product.categoryId}
          productId={product.id}
        />
      </div>
    </div>
  );
}
