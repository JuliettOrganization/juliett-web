'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: 'Home', href: '/home', icon: HomeIcon },
 
  { name: 'Home', href: '/home'},
  { name: 'Report Manager',href: '/home/reportmanager',},
  { name: 'Report Design', href: '/home/customers' },
  { name: 'Loading Status', href: '/home/customers' },
  { name: 'Scheduler', href: '/home/customers'},
  { name: 'Configuration', href: '/home/customers' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            style={{ backgroundColor: 'rgba(0, 0, 0,0.8)' }}
            className={clsx(
              'flex  grow items-center justify-center gap-2 p-3 text-l font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3' ,
              {
                'text-l  bg-sky-100 text-purple-500  font-bold': pathname === link.href,
              },
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
