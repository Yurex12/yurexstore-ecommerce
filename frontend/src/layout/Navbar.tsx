import { NavLink } from 'react-router-dom';

import { links } from './constants';

export default function Navbar() {
  return (
    <nav className='hidden lg:block'>
      <ul className='flex space-x-12'>
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `${
                  isActive ? 'border-b-primary' : ''
                } cursor-pointer border-2 border-white py-1 hover:border-b-primary`
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
