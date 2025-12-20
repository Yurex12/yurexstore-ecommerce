import { useNavigate } from 'react-router-dom';

import type { Category as CategoryCardProps } from '../types';

export default function CategoryCard({
  name,
  description,
  image,
  slug,
}: CategoryCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className='flex flex-col shrink-0 w-[30%] sm:w-[35%] md:w-[38%] lg:w-[24%] items-center justify-center gap-3 py-10 px-10 border bg-background rounded'
      onClick={() => navigate(`/shop?category=${slug}`)}
    >
      <div className='bg-primary/5 p-6 rounded-full'>
        <img
          src={image}
          alt={name}
          width={48}
          height={48}
          className='object-contain'
        />
      </div>

      <div className='text-center'>
        <p className='font-semibold text-sm'>{name}</p>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
}
