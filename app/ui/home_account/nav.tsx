'use client';
import Link from 'next/link';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';
import NavHomeUserClient from '../NavHomeUserClient';
import { useState, useEffect } from 'react';
import NavClient from './NavClient';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import { useAccount } from '@/app/context/AccountContext';
import Image from 'next/image';
import favicon from '@/public/favicon.jpg';


const imagePaths = [
  favicon
  // Add more image paths as needed
];

export default function Nav() {
  const { accountname, accountpic } = useAccount();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  const handleClick = () => {
    setLoading(true);
  };
  const logo = imagePaths[1 % imagePaths.length];
  return (
  

    <div className="topbar_flex justify-between items-center h-20 px-2 bg-black text-white">
     <>
     <div className="flex flex-row items-center space-x-4">
      {loading && <LoadingSpinner />}
      <Link href="/home_user">
        <div className="flex flex-row items-center" onClick={handleClick}>
          {/* <div>
            <p className="topbar_j_font">J</p>
          </div>*/}
          <div>
            <Image
              src={logo}
              alt="Favicon"
              width={24}
              height={24}
              className="w-12 h-12 border border-white"
            />
            </div>
            </div>
            </Link>
            <Link href="/home_account">
            <div className="flex flex-row items-center" onClick={handleClick}>
            {accountname && (
          <div className="flex items-center space-x-2">
            <Image
              src={accountpic || '/accounts/image2.jpg'}
              alt={accountname}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <p className="text-white text-wrap text-xs w-16">{accountname}</p>
          </div>
        )}
          </div>
          </Link>
          </div>
     
    </>

    <div className="flex-grow flex justify-center">
        <NavClient />
      </div>

      <div className="flex items-center justify-between space-x-2">
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