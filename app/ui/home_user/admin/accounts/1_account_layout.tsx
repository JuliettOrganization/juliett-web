// 'use client';
// import { useEffect, useState } from 'react';
// import Pagination from '@/app/ui/home_user/admin/1_user_table_pagination';
// import Search from '@/app/ui/search';
// import { UsersTableServer } from '@/app/ui/home_user/admin/1_TableServer_users';
// import { CreateUser } from '@/app/ui/home_user/admin/buttons';
// import { ReportsTableSkeleton } from '@/app/ui/skeletons';
// import { fetchUsersPages } from '@/app/lib/data';
// import {Suspense} from 'react';

// export default function UserLayoutClient(props: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   const searchParams = props.searchParams;
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;
//   const [totalPages, setTotalPages] = useState<number>(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const pages = await fetchUsersPages(query);
//       setTotalPages(pages);
//     };
//     fetchData();
//   }, [query]);

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className="mb-4 text-xl md:text-4xl">User List</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search user..." />
//         <CreateUser />
//       </div>
//       {/* <Suspense key={query + currentPage} fallback={<ReportsTableSkeleton />}> */}
//         <UsersTableServer query={query} currentPage={currentPage} />
//       {/* </Suspense> */}
//       <div className="mt-5 flex w-full justify-center">
//         <Pagination totalPages={totalPages} />
//       </div>
//     </div>
//   );
// }
