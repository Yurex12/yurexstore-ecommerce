import BrandFeatures from './BrandFeatures';
import Hero from './Hero';
import NewsLetter from './NewsLetter';
import ProductShowcase from './ProductShowcase';
import PromotionalSection from './PromotionalSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandFeatures />
      <ProductShowcase />
      <PromotionalSection />
      <NewsLetter />
    </>
  );
}
