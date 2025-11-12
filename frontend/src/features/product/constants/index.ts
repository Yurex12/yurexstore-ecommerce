import type { Color, SortOption } from '../types';

export const sortOptions: SortOption[] = [
  { id: 'most-popular', name: 'Most Popular' },
  { id: 'best-rating', name: 'Best Rating' },
  { id: 'newest', name: 'Newest' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
];

export const colors: Color[] = [
  { id: 'white', name: 'bg-white', ringValue: 'ring-gray-400' },
  { id: 'black', name: 'bg-black', ringValue: 'ring-black' },
  { id: 'blue', name: 'bg-blue-600', ringValue: 'ring-blue-600' },
  { id: 'red', name: 'bg-red-600', ringValue: 'ring-red-600' },
  { id: 'green', name: 'bg-green-600', ringValue: 'ring-green-600' },
];

export const genders: string[] = ['male', 'female', 'both'];

export const MAX_IMAGE_SIZE = 1024 * 1024;
