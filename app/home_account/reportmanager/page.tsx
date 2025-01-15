'use client';
import Pagination from '@/app/ui/home_account/reportmanager/pagination';
import Search from '@/app/ui/search';
import ReportsTableClient from '@/app/ui/home_account/reportmanager/table';
import { CreateReport } from '@/app/ui/home_account/reportmanager/buttons';
import { ReportsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useEffect, useState, use } from 'react';
import { useAccount } from '@/app/context/AccountContext';


type SearchParams = Promise<{ query?: string; page?: string }>;

interface PageProps {
  searchParams: SearchParams;
}

export default function Page({ searchParams }: PageProps) {
  const [totalPages, setTotalPages] = useState(0);
  const params = use(searchParams);
  const query = params.query || '';
  const currentPage = Number(params.page) || 1;
  const { accountid } = useAccount();


useEffect(() => {
  if (accountid) {
    fetch(`/api/home_account/reportmanager/fetchReportsPages?accountid=${accountid}&query=${encodeURIComponent(query)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        return response.json();
      })
      .then((data) => {
        setTotalPages(data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
    }    
  }, [query,accountid]);



  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='mb-4 text-4xl'>Report List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search report..." />
        <CreateReport />
      </div>
      <div>
      <Suspense key={query + currentPage} fallback={<ReportsTableSkeleton />}>
        <ReportsTableClient query={query} currentPage={currentPage} />
      </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}