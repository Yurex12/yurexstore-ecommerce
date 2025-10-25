import type { Category as CategoryCardProps } from '../types';

export default function CategoryCard({
  name,
  description,
  image,
}: CategoryCardProps) {
  return (
    <div className='flex flex-col shrink-0 flex-1 items-center justify-center gap-3 py-10 px-10 w-full rounded-xl cursor-pointer border bg-background text-foreground/80 transition-all hover:border-primary hover:shadow-md'>
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
