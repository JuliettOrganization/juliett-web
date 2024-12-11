import { UserGroupIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-300">
        <div className="fixed top-20 left-0 w-full flex justify-start p-4 shadow bg-white z-10">
    <Link href="/home_user" className="flex items-center space-x-2 text-purple-600">
    
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-xl"> | </span>
      <span className="hover:underline">Back to Home Page</span>
    </Link>
    </div>
      <div className="max-w-2xl mx-auto p-10 rounded-xl bg-white shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Link href="/home_user/admin/users" className="flex flex-col items-center p-6 bg-purple-100 rounded-lg shadow hover:bg-purple-200 transition">
            <UserGroupIcon className="w-16 h-16 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-purple-600">Manage Users</h2>
          </Link>
          <Link href="/home_user/admin/accounts" className="flex flex-col items-center p-6 bg-green-100 rounded-lg shadow hover:bg-green-200 transition">
            <CircleStackIcon className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-green-600">Manage Accounts</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}