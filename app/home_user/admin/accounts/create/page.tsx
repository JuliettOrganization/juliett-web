'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import MainInformationForm from '@/app/ui/home_user/admin/accounts/create/MainInformationForm';
import DataSourcesForm from '@/app/ui/home_user/admin/accounts/create/DataSourcesForm';

export default function Page() {
  const [mainInfo, setMainInfo] = useState({
    accountName: '',
    billing: false,
    selectedCurrencies: [],
    selectedFile: null,
  });
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>(null);

  const handleMainInfoChange = (info: any) => {
    setMainInfo(info);
  };

  const handleDataSourcesChange = (sources: string[]) => {
    setDataSources(sources);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
      // Append mainInfo fields to formData
      formData.append('accountName', mainInfo.accountName);
      formData.append('billing', mainInfo.billing.toString());
      formData.append('selectedCurrencies', mainInfo.selectedCurrencies.join(';'));
      if (mainInfo.selectedFile) {
        formData.append('selectedFile', mainInfo.selectedFile);
      }

      // Concatenate dataSources into a single string with semicolon-separated values
      const dataSourcesString = dataSources.join(';');
      formData.append('dataSources', dataSourcesString);
      
    try {
      const response = await fetch('/api/account/createnewaccount', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account created successfully');
        window.location.href = '/home_user/admin/accounts';
      } else {
        const result = await response.json();
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setErrors({ general: ['An unexpected error occurred.'] });
    }
  };


  return (
    <div className="w-full">
      <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-purple-200 z-10">
        <Link href="/home_user/admin/accounts" className="flex items-center space-x-2 text-purple-600">
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-xl">|</span>
          <span>Cancel and back to account list page</span>
        </Link>
      </div>
      <div className="flex-col m-4 justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex w-full items-center justify-between">
            <h1 className="mt-3 text-xl md:text-4xl">Create a new account</h1>
            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-700"
              >
                Save
              </button>
              <button 
                type="button" 
                className="bg-gray-200 text-gray-600 rounded-full px-4 py-2 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-8 md:mt-8">
            <Suspense fallback={<div>Loading...</div>}>
              <MainInformationForm onChange={handleMainInfoChange} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <DataSourcesForm onChange={handleDataSourcesChange} />
            </Suspense>
          </div>
          {errors && (
            <div className="mt-4 text-red-500">
              <ul>
                {Object.entries(errors).map(([field, errorMessages]) => (
                  <li key={field}>{field}: {(errorMessages as string[]).join(', ')}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}