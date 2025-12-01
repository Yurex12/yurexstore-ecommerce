import type { SortOption } from '../types';

export const sortOptions: SortOption[] = [
  { id: 'newest', name: 'Newest' },
  { id: 'best-rating', name: 'Best Rating' },
  { id: 'price-low-to-high', name: 'Price: Low to High' },
  { id: 'price-high-to-low', name: 'Price: High to Low' },
];

export const genders: string[] = ['male', 'female', 'both'];

export const MAX_IMAGE_SIZE = 1024 * 1024;
