import BrandFeatures from './BrandFeatures';
import CategoryCard from './FeaturedCategories';
import Hero from './Hero';
import NewsLetter from './NewsLetter';
import ProductShowcase from './ProductShowcase';
import PromotionalSection from './PromotionalSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandFeatures />
      <div className='flex  justify-between items-center mt-10 flex-wrap gap-x-20'>
        {[1, 2, 3, 4].map((val, i) => (
          <CategoryCard image='shirt.png' name='Shirts' />
        ))}
      </div>
      <ProductShowcase />
      <PromotionalSection />
      <NewsLetter />
    </>
  );
}
