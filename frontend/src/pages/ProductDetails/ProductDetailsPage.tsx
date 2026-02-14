import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import PageLoader from '@/components/PageLoader';

import ProductImageCarousel from '@/features/product/components/ProductDetailsImageCarousel';
import ProductInfo from '@/features/product/components/ProductInfo';
import ProductReview from '@/features/product/components/ProductReviews';
import SimilarProductsList from '@/features/product/components/SimilarProductsList';

import { useProduct } from '@/features/product/hooks/useProduct';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [productId]);

  const { product, isPending, error } = useProduct(productId);

  if (isPending)
    return (
      <PageLoader
        message='Loading product...'
        className='h-[85svh] md:h-[80svh]'
      />
    );

  if (error)
    return (
      <ErrorState message={error.message} className='h-[80svh] border-0' />
    );

  if (!product)
    return (
      <EmptyState message='Product not found' className='h-[80svh] border-0' />
    );
  return (
    <div className='space-y-10'>
      <div className='flex gap-x-4 mb-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm'
        >
          <ArrowLeft />
          <span>Back</span>
        </button>
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
