import { brandFeatures } from './constants';
import BrandFeature from './BrandFeature';

function BrandFeatures() {
  return (
    <div className='bg-muted/50 mt-10'>
      <ul className='grid grid-cols-2 gap-4 ms:gap-6 rounded-xl p-4 md:p-8 sm:grid-cols-3 lg:grid-cols-4'>
        {brandFeatures.map((feature, index) => (
          <BrandFeature key={index} {...feature} />
        ))}
      </ul>
    </div>
  );
}

export default BrandFeatures;
