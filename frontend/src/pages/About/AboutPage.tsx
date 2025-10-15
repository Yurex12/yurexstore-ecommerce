import { Link } from 'react-router-dom';

import { MoveRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className='mx-auto flex flex-col items-center justify-between gap-y-8 lg:flex-row lg:gap-x-20'>
      <div className='lg:basis-1/2'>
        <h1 className='mb-3 text-xl font-semibold capitalize sm:mb-5 sm:text-2xl md:text-3xl lg:basis-1/2 lg:text-4xl'>
          Welcome to Yurexstore
        </h1>
        <div className='space-y-8'>
          <p>
            At Yurexstore, we are dedicated to delivering high-quality products
            that enrich the lives of our customers. With a focus on excellence,
            affordability, and innovation, we bring together a diverse range of
            offerings, from cutting-edge electronics to stylish apparel.
          </p>
          <p>
            Our curated collection of products offers the perfect blend of
            comfort and quality, designed to enrich your everyday experiences.
            Discover true freedom and tranquility with items that inspire,
            whether it's through innovative design, unmatched craftsmanship, or
            thoughtful details.
          </p>
          <p>
            Bring joy to your life with products that stand out, offering
            moments of connection and delight. From the practical to the
            luxurious, every piece is crafted to elevate your lifestyle and
            create lasting memories, surrounded by the beauty of exceptional
            design and functionality
          </p>

          <div className='space-y-4'>
            <p>
              Join us on our journey as we continue to innovate and inspire.
            </p>
            <Link
              to='/shop'
              className='rounded-lg bg-primary px-6 py-2 hover:bg-primary/90 font-medium text-white text-sm flex items-center w-fit gap-x-2'
            >
              <span>Explore Our Products</span>
              <MoveRight />
            </Link>
          </div>
        </div>
      </div>

      {/* image */}
      <div className='lg:basis-1/2'>
        <img src='about-us.jpg' alt='About image' />
      </div>
    </div>
  );
}
