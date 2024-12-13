'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon
import Billing from '@/app/ui/home_user/admin/accounts/1_accountbilling';
import DataSources from '@/app/ui/home_user/admin/accounts/1_datasources_style';
import Currencies from '@/app/ui/home_user/admin/accounts/1_currencies_style';

interface AccountsTableClientProps {
  accounts: Array<{ accountid: string, accountname: string, billing: string, datasources: string, currencies: string }>;
}

const AccountsTableClient: React.FC<AccountsTableClientProps> = ({ accounts }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = (accountid: string) => {
    setActiveMenu(activeMenu === accountid ? null : accountid);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteAccount = async (accountId: string) => {
    try {
      const response = await fetch('/api/account/deleteaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: accountId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account deleted successfully:', result);
        setPopupMessage('Account deleted successfully');
        setTimeout(() => {
          setPopupMessage(null);
          window.location.reload();
        }, 3000); // Hide the popup after 3 seconds and refresh the page
      } else {
        const result = await response.json();
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrors({ general: ['An unexpected error occurred.'] });
    }
  };

  const handleEditAccount = (accountId: string) => {
    router.push(`/home_user/admin/accounts/${accountId}`);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {accounts?.map((account) => (
              <div key={account.accountid} className="mb-2 w-full rounded-md shadow p-4">
                <div><p className="text-sm text-purple-500">{account.accountname}</p></div>
                <div><DataSources dataSources={account.datasources} /></div>
                <div><Currencies Currencies={account.currencies} /></div>
                <div><Billing status={account.billing} /></div>
               
                <div className="flex justify-end gap-2 relative">
                  <button onClick={() => toggleMenu(account.accountid)}>
                    <EllipsisVerticalIcon className="h-6 w-6 z-20 text-gray-700" />
                  </button>
                  {activeMenu === account.accountid && (
                    <div ref={menuRef} className="absolute right-0 mr-2 z-50 bg-white shadow-lg rounded w-48">
                      <ul>
                        <li
                          className="px-4 py-2 z-50 bg-white hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleEditAccount(account.accountid)}
                        >
                          Edit Account
                        </li>
                        <li
                          className="px-4 py-2 z-50 bg-white hover:bg-red-100 cursor-pointer"
                          onClick={() => handleDeleteAccount(account.accountid)}
                        >
                          Delete Account
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Account Name</th>
                <th scope="col" className="px-4 py-5 font-medium">Data Sources</th>
                <th scope="col" className="px-4 py-5 font-medium">Currencies</th>
                <th scope="col" className="px-4 py-5 font-medium">Billing</th>
                <th scope="col" className="relative py-3 pl-6 pr-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {accounts.map((account) => (
                <tr key={account.accountid} className="w-full border-b py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-4 py-3 sm:pl-6">{account.accountname}</td>
                  <td className="whitespace-nowrap px-4 py-3"><DataSources dataSources={account.datasources} /></td>
                  <td className="whitespace-nowrap px-4 py-3"><Currencies Currencies={account.currencies} /></td>
                  <td className="whitespace-nowrap px-4 py-3"><Billing status={account.billing} /></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 relative">
                    <button onClick={() => toggleMenu(account.accountid)}>
                      <EllipsisVerticalIcon className="h-6 w-6 z-20 text-gray-700" />
                    </button>
                    {activeMenu === account.accountid && (
                      <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEditAccount(account.accountid)}
                          >
                            Edit Account
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDeleteAccount(account.accountid)}
                          >
                            Delete Account
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {popupMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg">
          {popupMessage}
        </div>
      )}
      {errors && (
        <div className="mt-4 text-red-500">
          <ul>
            {Object.entries(errors).map(([field, errorMessages]) => (
              <li key={field}>{field}: {(errorMessages as string[]).join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountsTableClient;