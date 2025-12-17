import type { BrandFeature as BrandFeatureProps } from './types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BrandFeature({
  title,
  icon,
  description,
}: BrandFeatureProps) {
  return (
    <li className='rounded-xl py-6 lg:py-10 bg-background'>
      <div
        className={`flex h-40 flex-col items-center space-y-6 md:h-60 md:px-6 md:py-3 xl:h-auto  `}
      >
        {/* icon */}
        <div className='flex items-center justify-center rounded-full border border-input bg-muted/50 p-5 text-2xl md:p-7 md:text-4xl'>
          <FontAwesomeIcon icon={icon} className='text-primary' />
        </div>

        <div className='w-full space-y-1 lg:space-y-3'>
          <h2 className='text-center font-semibold tracking-tight md:text-lg text-foreground'>
            {title}
          </h2>
          <p className='mx-auto w-3/4 text-center text-xs text-muted-foreground sm:w-3/5 md:text-sm lg:w-full'>
            {description}
          </p>
        </div>
      </div>
    </li>
  );
}
