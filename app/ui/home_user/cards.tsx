'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useAccount } from '@/app/context/AccountContext';
import {CardsSkeleton} from '@/app/ui/skeletons';
import LoadingSpinner from '@/app/ui/LoadingSpinner';



// Import images directly
import image1 from '@/public/accounts/image3.jpg';
import image2 from '@/public/accounts/image4.jpg';
import image3 from '@/public/accounts/image1.jpg';
import image4 from '@/public/accounts/image2.jpg';
import image5 from '@/public/accounts/image5.jpg';
import image6 from '@/public/accounts/image6.jpg';
import image7 from '@/public/accounts/image7.jpg';
import image8 from '@/public/accounts/image8.jpg';

const imagePaths = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  // Add more image paths as needed
];
interface Account {
  accountid: string;
  accountname: string;
  billing: string;
  datasources: string;
  lastupdated: string;
  currencies: string;
  file: string;
  users: string;
}


  const account_level_module = 'This is an account.';
  const user_level_module = 'This is a user-level module.';



const Cards = () => {
 
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { setAccountInfo } = useAccount();
  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/home_user/fetchAccountsforUser');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountClick = (accountid: string, accountname: string, accountpic: StaticImageData) => {
    setLoading(true);
    setAccountInfo(accountid, accountname, accountpic.src);
  };


  if (loading) {
    return(
  <CardsSkeleton/>

  );
  }
  const additionalAccounts = [
    { accountid: 'profile', accountname: 'Profile', href: '/home_user/profile', module: user_level_module },
    { accountid: 'documentation', accountname: 'Documentation', href: '/home_user/documentation', module: user_level_module },
    { accountid: 'support', accountname: 'Support', href: '/home_user/support', module: user_level_module },
    { accountid: 'admin', accountname: 'Admin', href: '/home_user/admin', module: user_level_module },
  ];

  const allAccounts = [
    ...accounts.map(account => ({ ...account, href: '/home_account', module: account_level_module })),
    ...additionalAccounts,
  ];

  return (
   
    <div className="cards-container">
        {loading && <LoadingSpinner />}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw]">
      {allAccounts.map((account, index) => {
                  const accountpic = imagePaths[index % imagePaths.length];
                  return (
        <Link
          key={account.accountid}
          href={account.href}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          onClick={() => handleAccountClick(account.accountid, account.accountname, accountpic)}
        >
          <Image
               src={accountpic}
               alt={account.accountname}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            priority
          />
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{account.accountname}</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">{account.module}</p>
          </div>
          <div className="p-4 border-t">
            <div className="text-blue-500 hover:underline">
              Click here to access
            </div>
          </div>
        </Link>
     );
    })}
    </div>
    </div>
  );
};

export default Cards;