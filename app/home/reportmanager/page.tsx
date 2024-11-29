import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateReport } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ReportsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReportsPages } from '@/app/lib/data';

 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchReportsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='mb-4 text-xl md:text-4xl'>Report List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search report..." />
        <CreateReport />
      </div>
      {<Suspense key={query + currentPage} fallback={<ReportsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
    </div>
  );
}