import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  images: { id: string; url: string }[];
};

export default function ProductImageCarousel({ images }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }}
      pagination={{ clickable: true }}
      className='w-full md:h-125 h-100 relative bg-gray-50'
    >
      {images.map((img) => (
        <SwiperSlide key={img.id} className='bg-gray-50'>
          <img
            src={img.url}
            alt='product image'
            className='h-full w-full object-cover object-center'
          />
        </SwiperSlide>
      ))}

      <div className='swiper-button-prev-custom absolute top-1/2 left-2 -translate-y-1/2 text-primary cursor-pointer z-10'>
        <ChevronLeft size={40} />
      </div>
      <div className='swiper-button-next-custom absolute top-1/2 right-2 -translate-y-1/2 text-primary cursor-pointer z-10'>
        <ChevronRight size={40} />
      </div>
    </Swiper>
  );
}
