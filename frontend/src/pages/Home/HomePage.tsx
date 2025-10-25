import BrandFeatures from './BrandFeatures';
import FeaturedCategories from './FeaturedCategories';
import Hero from './Hero';
import NewsLetter from './NewsLetter';
import ProductShowcase from './ProductShowcase';
import PromotionalSection from './PromotionalSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductShowcase />
      <PromotionalSection />
      <BrandFeatures />
      <NewsLetter />
    </>
  );
}
