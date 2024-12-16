'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/home_account/nav-links';

export default function NavClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-start xl:flex-grow">
        <div className="hidden xl:flex">
          <NavLinks />
        </div>
        <div className="xl:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 xl:hidden">
          <NavLinks />
        </div>
      )}
    </>
  );
}