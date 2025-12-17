import Hero from './Hero';
import FeaturedCategories from './FeaturedCategories';
import ProductShowcase from './ProductShowcase';
import PromotionalSection from './PromotionalSection';
import BrandFeatures from './BrandFeatures';
import NewsLetter from './NewsLetter';

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
