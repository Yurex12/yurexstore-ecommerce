import { brandFeatures } from './constants';
import BrandFeature from './BrandFeature';

function BrandFeatures() {
  return (
    <section className='py-10 lg:py-16 bg-background'>
      <div className='container mx-auto'>
        <ul className='grid grid-cols-2 gap-6 rounded-xl border border-border bg-card p-8 md:grid-cols-4'>
          {brandFeatures.map((feature, index) => (
            <BrandFeature key={index} {...feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BrandFeatures;
