import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

function Logo({ className }: { className?: string }) {
  return (
    <Link
      to='/'
      className={cn('text-xl font-semibold text-primary', className)}
    >
      Yurexstore
    </Link>

    // <Link to="/">
    //   <img src="logo.png" alt="logo" />
    // </Link>

    // <Link to="/" className="flex items-center justify-center gap-4">
    //   {/* <HiMiniShoppingCart className="text-brandBlue text-3xl font-semibold" />
    //    */}
    //   <FaCartShopping className="text-brandBlue text-3xl font-semibold" />
    //   <span className="text-brandGray-10 text-xl font-semibold">
    //     Yurexstore
    // </Link>
  );
}

export default Logo;
