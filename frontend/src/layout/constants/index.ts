import type { footerLink, Link } from '../types';

export const links: Link[] = [
  {
    title: 'Home',
    href: '/',
  },

  {
    title: 'Shop',
    href: '/shop',
  },
  {
    title: 'About us',
    href: '/about-us',
  },
  {
    title: 'Contact us',
    href: '/contact-us',
  },
];

export const footerLinks: footerLink[] = [
  {
    name: 'Shop',
    links: [
      {
        title: 'All collections',
        href: '/all',
      },
      {
        title: `Men's Apparel`,
        href: '/mens',
      },
      {
        title: `Women's Apparel`,
        href: '/women-apparel',
      },
      {
        title: 'Jewelry',
        href: '/jewelry',
      },
      {
        title: 'Electronics',
        href: '/electronics',
      },
    ],
  },
  {
    name: 'Company',
    links: [
      {
        title: 'About Us',
        href: '/about-us',
      },
      {
        title: 'Contact Us',
        href: '/contact-us',
      },
      {
        title: 'Affiliates',
        href: '/affiliates',
      },
      {
        title: 'Support',
        href: '/support',
      },
    ],
  },
  {
    name: 'support',
    links: [
      {
        title: 'Cookie Policy',
        href: '/support',
      },
      {
        title: 'Terms of Use',
        href: '/terms-of-use',
      },
      {
        title: 'FAQs',
        href: '/faqs',
      },
    ],
  },
];
