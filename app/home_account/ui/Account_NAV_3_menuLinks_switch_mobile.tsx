"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLinks from "@/app/home_account/ui/Account_NAV_2_menuLinks";

export default function NavClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-center xl:flex-grow">
        <div className="hidden xl:flex">
          <NavLinks />
        </div>
        <div className="xl:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <XMarkIcon className="w-8 h-8 text-bold mt-2 mr-8" />
            ) : (
              <Bars3Icon className="w-10 h-10 text-bold mt-2 mr-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed w-full left-0 ml-0 right-0 top-20 bg-black text-white space-y-4 py-4 xl:hidden">
          <NavLinks />
        </div>
      )}
    </>
  );
}
