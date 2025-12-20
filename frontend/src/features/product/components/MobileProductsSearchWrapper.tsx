import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileProductsSearch from './MobileProductsSearch';

export default function MobileProductsSearchWrapper() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.hash === '#search');

  useEffect(() => {
    setIsOpen(location.hash === '#search');
  }, [location.hash]);

  return isOpen ? <MobileProductsSearch /> : null;
}
