'use client';
import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon
import UserStatus from '@/app/ui/home_user/admin/users/1_userstatus_style';
import EmailConfirmation from '@/app/ui/home_user/admin/users/1_useremailconfirmation_style';
import AccountNames from '@/app/ui/home_user/admin/users/1_accountnames_style';

interface UsersTableClientProps {
  users: Array<{ 
    id: string, 
    name: string, 
    email: string, 
    role: string,
    accountstatus: string, 
    confirmationstatus: string ,
  accountnames:string  }>;
}

const UsersTableClient: React.FC<UsersTableClientProps> = ({ users }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (userid: string) => {
    setActiveMenu(activeMenu === userid ? null : userid);
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

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div key={user.id} className="mb-2 w-full rounded-md shadow p-4">
                <div><p className="text-sm text-purple-500">{user.name}</p></div>
                <div><p className="text-sm text-purple-500">{user.email}</p></div>
                <div><p className="text-sm text-purple-500">{user.role}</p></div>
                <div><EmailConfirmation status={user.confirmationstatus} /></div>
                <div><UserStatus status={user.accountstatus} /></div>
                <div><AccountNames accountnames={user.accountnames} /></div>
                <div className="flex justify-end gap-2 relative">
                  <button onClick={() => toggleMenu(user.id)}>
                    <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  {activeMenu === user.id && (
                    <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit User</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete User</li>
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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Name</th>
                <th scope="col" className="px-4 py-5 font-medium">Email</th>
                <th scope="col" className="px-4 py-5 font-medium">Role</th>
                <th scope="col" className="px-4 py-5 font-medium">AWS Account Status</th>
                <th scope="col" className="px-4 py-5 font-medium">Confirmation Status</th>
                <th scope="col" className="px-4 py-5 font-medium">Juliett Account Names</th>
                <th scope="col" className="relative py-3 pl-6 pr-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user) => (
                <tr key={user.id} className="w-full border-b py-3 text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap px-4 py-3 sm:pl-6">{user.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-4 py-3">{user.role}</td>
                  <td className="whitespace-nowrap px-4 py-3"><UserStatus status={user.accountstatus} /></td>
                  <td className="whitespace-nowrap px-4 py-3"><EmailConfirmation status={user.confirmationstatus} /></td>
                  <td className="whitespace-nowrap px-4 py-3"> <div><AccountNames accountnames={user.accountnames} /></div></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 relative">
                    <button onClick={() => toggleMenu(user.id)}>
                      <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                    </button>
                    {activeMenu === user.id && (
                      <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit User (AWS Cognito)</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete User (AWS Cognito)</li>
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
    </div>
  );
};

export default UsersTableClient;