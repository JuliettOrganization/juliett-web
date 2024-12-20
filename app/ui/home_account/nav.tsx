'use client';
import Link from 'next/link';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';
import NavHomeUserClient from '../NavHomeUserClient';
import { useState, useEffect } from 'react';
import NavClient from './NavClient';
import LoadingSpinner from '@/app/ui/LoadingSpinner';

export default function Nav() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  const handleClick = () => {
    setLoading(true);
  };
  return (
    <div className="topbar_flex justify-between items-center h-20 px-4 bg-black text-white">
     <>
      {loading && <LoadingSpinner />}
      <Link href="/home_user">
        <div className="flex flex-row items-center" onClick={handleClick}>
          {/* <div>
            <p className="topbar_j_font">J</p>
          </div>*/}
          <div>
            <p className="topbar_uliett_font">JULIETT</p>
          </div>
        </div>
      </Link>
    </>

    <div className="flex-grow flex justify-center">
        <NavClient />
      </div>

      <div className="flex items-center space-x-4">
        <NavHomeUserClient />
        {/* <form action={async () => { 'use server'; await signOut(); }}>
          <button className="flex items-center gap-2 p-4 text-l font-medium hover:text-blue-600">
            <PowerIcon className="w-6" />
          </button>
        </form> */}
      </div>
    </div>
  );
}