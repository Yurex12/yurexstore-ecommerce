import BrandFeatures from './BrandFeatures';
import CategoryCard from './FeaturedCategories';
import Hero from './Hero';
import NewsLetter from './NewsLetter';
import ProductShowcase from './ProductShowcase';
import PromotionalSection from './PromotionalSection';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const categories = [
  {
    id: '12',
    name: 'Electronics',
    desc: 'Gadgets & accessories',
    image: '/electronics.png',
  },
  {
    id: '23',
    name: 'Jewelry',
    desc: 'Rings & bracelets',
    image: '/jewelry.png',
  },
  {
    id: '67',
    name: 'Men’s Fashion',
    desc: 'Clothes & shoes',
    image: '/men-wears.png',
  },
  {
    id: '78',
    name: 'Women’s Fashion',
    desc: 'Clothes & shoes',
    image: '/women-wears.png',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className='mt-10 '>
        <div>
          <h1 className='heading'>Featured Category</h1>
        </div>

        <ScrollArea className='w-full whitespace-nowrap rounded'>
          <div className='flex bg-muted/50 mt-2 gap-4 p-4 md:p-8'>
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>

      <ProductShowcase />
      <PromotionalSection />
      <BrandFeatures />
      <NewsLetter />
    </>
  );
}
