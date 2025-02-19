"use client";
import Link from "next/link";
import NavHomeUserClient from "../../ui_general/NavHomeUserClient";
// import LoadingSpinner from '@/app/ui/LoadingSpinner';
// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';

export default function NavHomeUser() {
  // const [loading, setLoading] = useState(false);
  // const pathname = usePathname();

  // useEffect(() => {
  //   setLoading(false); // Stop loading when the component mounts or updates
  // }, [pathname]);

  // const handleClick = () => {
  //   setLoading(true);
  // };

  return (
    // <>
    //   {loading && <LoadingSpinner />}
    <div className="topbar_flex space-x-24 justify-between">
      <Link
        href="/home_user"
        // onClick={handleClick}
      >
        <div className="flex flex-row items-center">
          {/* <div>
            <p className="topbar_j_font">J</p>
          </div> */}
          <div>
            <p className="topbar_uliett_font">JULIETT</p>
          </div>
        </div>
      </Link>
      <NavHomeUserClient />
    </div>
    // </>
  );
}
