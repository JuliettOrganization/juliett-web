import Pagination from '@/app/ui/home_user/admin/users/1_user_table_pagination';
import Search from '@/app/ui/search';
import { UsersTableServer } from '@/app/ui/home_user/admin/users/1_TableServer_users';
import { CreateUser } from '@/app/ui/home_user/admin/users/buttons';
import { ReportsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchUsersPages } from '@/app/lib/data';
import Link from 'next/link';
import { ArrowLeftIcon,  } from '@heroicons/react/24/outline';

export default async function Page(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUsersPages(query);

  return (
    <div className="w-full">
    <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-purple-200 z-10">
    <Link href="/home_user/admin" className="flex items-center space-x-2 text-purple-600">
    
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-xl"> | </span>
      <span>Back to Admin Page</span>
    </Link>
    </div>
    <div className="flex-col m-4 justify-center">
      <div className="flex w-full items-center justify-between">
        <h1 className='mt-3 text-xl md:text-4xl'>User List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        <CreateUser />
      </div>
      <Suspense key={query + currentPage} fallback={<ReportsTableSkeleton />}>
        <UsersTableServer query={query} currentPage={currentPage} />
      </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
