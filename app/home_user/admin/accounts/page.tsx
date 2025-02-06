import Pagination from "@/app/home_user/admin/users/ui/1_user_table_pagination";
import Search from "@/app/ui_general/search";
import { AccountsTableServer } from "@/app/home_user/admin/accounts/ui/1_TableServer_accounts";
import { CreateAccount } from "@/app/home_user/admin/accounts/ui/buttons";
import { ReportsTableSkeleton } from "@/app/ui_general/skeletons";
import { Suspense } from "react";
import { fetchAccountsPages } from "@/app/lib/data";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type SearchParams = Promise<{ query?: string; page?: string }>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;
  const totalPages = await fetchAccountsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-64 left-0 rounded-full justify-start p-3 shadow bg-gray-200 hover:bg-purple-200 z-10">
        <Link
          href="/home_user/admin"
          className="flex items-center space-x-2 text-purple-600"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-xl"> | </span>
          <span>Back to Admin Page</span>
        </Link>
      </div>
      <div className="flex-col m-4 justify-center">
        <div className="flex w-full items-center justify-between">
          <h1 className="mt-3 text-xl md:text-4xl">Account List</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search account..." />
          <CreateAccount />
        </div>
        <Suspense key={query + currentPage} fallback={<ReportsTableSkeleton />}>
          <AccountsTableServer query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
