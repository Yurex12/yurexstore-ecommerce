import { Link } from 'react-router-dom';

import { Instagram, TwitterIcon } from 'lucide-react';

import Logo from '@/components/Logo';
import { footerLinks } from './constants';

function Footer() {
  return (
    <footer className='mt-10'>
      <div className='mx-auto max-w-[1440px] px-6'>
        <div className='grid grid-cols-1 gap-y-5 py-5 sm:grid-cols-[2fr_1fr] sm:pl-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-x-4'>
          {/* text & logo */}
          <div className='space-y-3 p-1'>
            <Logo className='uppercase text-foreground/60' />
            <p className='sm:w-8/12 md:w-6/12'>
              Specializes in providing high-quality, stylish products for your
              wardrobe.
            </p>
            <div className='flex space-x-4'>
              {/* Telegram Icon */}
              <TwitterIcon className='h-6 w-6 text-foreground/60' />
              <Instagram className='h-6 w-6 text-foreground/60' />

              {/* X (Twitter) Icon */}
              <Instagram className='h-6 w-6 text-foreground/60' />
            </div>
          </div>

          {/* links */}
          {footerLinks.map((footerLink) => (
            <div className='p-1'>
              <h2 className='text-lg uppercase text-foreground/70'>
                {footerLink.name}
              </h2>
              <ul className='mt-3 space-y-3'>
                {footerLink.links.map((link) => (
                  <li>
                    <Link to={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* footer copyright */}
        <div className='mt-5 border-t'>
          <p className='p-3 text-center text-foreground/40 md:p-5'>
            Copyright &copy; {new Date().getFullYear()} Yurexstore.
            <span className='block pl-1 sm:inline-block'>
              All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
