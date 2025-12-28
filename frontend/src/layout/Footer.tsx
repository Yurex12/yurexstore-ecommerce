import { Instagram, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from '@/components/Logo';
import { footerLinks } from './constants';

function Footer() {
  return (
    <footer className='mt-20 border-t bg-muted/30'>
      {/* Container: Changed from fixed 1600px to max-width for responsiveness */}
      <div className='mx-auto max-w-[1600px] px-6 py-12 lg:px-12'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Section - Takes more space on large screens */}
          <div className='lg:col-span-2 space-y-6'>
            <Logo className='uppercase text-foreground/80' />
            <p className='text-muted-foreground leading-relaxed max-w-sm'>
              Specializes in providing high-quality, stylish products for your
              wardrobe. Elevate your everyday style with Yurexstore.
            </p>
            <div className='flex items-center space-x-5'>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Send className='h-5 w-5' /> {/* Using Send for Telegram */}
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Twitter className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((footerLink) => (
            <div key={footerLink.name} className='space-y-5'>
              <h2 className='text-sm font-bold uppercase tracking-wider text-foreground'>
                {footerLink.name}
              </h2>
              <ul className='space-y-3'>
                {footerLink.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      to='#'
                      className='text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className='mt-16 pt-8 border-t border-border/50'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <p className='text-sm text-muted-foreground'>
              Copyright &copy; {new Date().getFullYear()}{' '}
              <span className='font-medium text-foreground'>Yurexstore</span>.
              All rights reserved.
            </p>
            <div className='flex gap-6 text-xs text-muted-foreground uppercase tracking-widest'>
              <a href='#' className='hover:text-primary transition-colors'>
                Privacy Policy
              </a>
              <a href='#' className='hover:text-primary transition-colors'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
