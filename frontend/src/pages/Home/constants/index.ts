import {
  faShieldAlt,
  faKey,
  faTruckFast,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import type { BrandFeature } from '../types';

export const brandFeatures: BrandFeature[] = [
  {
    title: 'Certified',
    description: 'Available certificates of authenticity',
    icon: faShieldAlt,
  },
  {
    title: 'Secure',
    description: 'Certified marketplace since 2020',
    icon: faKey,
  },
  {
    title: 'Shipping',
    description: 'Free, fast and reliable worldwide',
    icon: faTruckFast,
  },
  {
    title: 'Transparent',
    description: 'Hassle-free return policy',
    icon: faEye,
  },
];
