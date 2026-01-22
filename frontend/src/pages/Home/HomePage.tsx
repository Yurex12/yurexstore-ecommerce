import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import ProductsPreview from './components/ProductsPreview';
import PromotionalSection from './components/PromotionalSection';
import BrandFeatures from './components/BrandFeatures';
import NewsLetter from './components/NewsLetter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductsPreview />
      <PromotionalSection />
      <BrandFeatures />
      <NewsLetter />
    </>
  );
}
