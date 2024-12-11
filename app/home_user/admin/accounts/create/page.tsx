import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MainInformationForm from '@/app/ui/home_user/admin/accounts/create/MainInformationForm';
import DataSourcesForm from '@/app/ui/home_user/admin/accounts/create/DataSourcesForm';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-purple-200 z-10">
        <Link href="/home_user/admin" className="flex items-center space-x-2 text-purple-600">
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-xl">|</span>
          <span>Back to Admin Page</span>
        </Link>
      </div>
      <div className="flex-col m-4 justify-center">
        <div className="flex w-full items-center justify-between">
          <h1 className="mt-3 text-xl md:text-4xl">Create a new account</h1>
          <div className="flex space-x-4">
            <button className="bg-black text-white rounded-full w-24 px-4 py-2 hover:bg-gray-700">Save</button>
            <button className="bg-gray-200 text-gray-600 rounded-full w-24 px-4 py-2 hover:bg-gray-700 hover:text-white">Cancel</button>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-center gap-8 md:mt-8">
          <Suspense fallback={<div>Loading...</div>}>
            <MainInformationForm />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <DataSourcesForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}