'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/home_account', colorref: '/home_account' },
  { name: 'Report Manager', href: '/home_account/reportmanager', colorref: '/home_account/reportmanager' },
  { name: 'Report Design', href: '/home_account/reportdesign/create', colorref: '/home_account/reportdesign' },
  { name: 'Loading Status', href: '/home_account/loadingstatus', colorref: '/home_account/loadingstatus' },
  { name: 'Scheduler', href: '/home_account/scheduler', colorref: '/home_account/scheduler' },
  { name: 'Configuration', href: '/home_account/configuration', colorref: '/home_account/configuration' },
];


export default function NavLinks() {
  const pathname = usePathname();
  const beginningOfPathname = pathname ? `/${pathname.split('/')[1]}` + (pathname.split('/')[2] ? `/${pathname.split('/')[2]}` : '') : '';


  
  return (
    <>
   
      <div className="flex flex-col rounded-lg xl:flex-row xl:space-x-8">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
       
              className={clsx(
                'flex items-center justify-center h-20 gap-2 p-3 text-sm font-medium text-gray-500 hover:text-white xl:flex-none xl:justify-start xl:p-2 xl:px-3',
                {
                  'text-sm text-white h-20 p-3 font-extrabold border-b-4 border-white': beginningOfPathname === link.colorref,
                }
              )}
            >
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}