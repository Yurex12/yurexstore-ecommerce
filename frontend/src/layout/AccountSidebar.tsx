import { Link } from 'react-router-dom';

export default function AccountSidebar() {
  const links = ['Orders', 'Settings'];
  return (
    <div className='bg-red-500 h-full'>
      {links.map((link, i) => (
        <Link key={i} to={link}></Link>
      ))}
    </div>
  );
}
