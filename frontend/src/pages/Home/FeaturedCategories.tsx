import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  image: string;
}

export default function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <Card className='relative flex-1 h-[240px] flex-shrink-0 overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      {/* Background image */}
      <img
        src={image}
        alt={name}
        className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
      />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent'></div>

      {/* Text content */}
      <div className='absolute bottom-4 left-4 right-4 text-left'>
        <h3 className='text-lg font-semibold text-white drop-shadow-md'>
          {name}
        </h3>
        <p className='text-xs text-gray-200/90 mt-1'>Explore Collection</p>
      </div>
    </Card>
  );
}
