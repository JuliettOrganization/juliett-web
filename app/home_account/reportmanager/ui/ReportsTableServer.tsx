// 'use client';
// import React, { useState, useEffect } from 'react';
// import ReportsTableClient from './table';
// import LoadingSpinner from '@/app/ui/LoadingSpinner';
// import { useAccount } from '@/app/context/AccountContext';

// interface ReportsTableServerProps {
//   query: string;
//   currentPage: number;
// }

// interface Report {
//   reportid: number;
//   reportname: string;
//   description: string;
//   date_concept: string;
//   period: string;
//   status: string;
//   tags: string;
//   last_updated: string;
// }


// const ReportsTableServer: React.FC<ReportsTableServerProps> = ({ query, currentPage }) => {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { accountid } = useAccount();

//   const fetchReports = async () => {
//     if (accountid) {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/home_account/reportmanager/fetchFilteredReports?accountid=${accountid}&query=${encodeURIComponent(query)}&page=${currentPage}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch reports');
//         }
//         const data = await response.json();
//         setReports(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//         setError((error as Error).message);
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, [accountid, query, currentPage]);

//   const [refreshCountdown, setRefreshCountdown] = useState(5);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const hasRunningReports = reports.some(report => report.status === 'running');
//       if (hasRunningReports) {
//         fetchReports();
//         setRefreshCountdown(5); // Reset countdown after fetching reports
//       } else {
//         clearInterval(interval);
//       }
//     }, 5000);

//     const countdownInterval = setInterval(() => {
//       setRefreshCountdown(prev => (prev > 1 ? prev - 1 : 5));
//     }, 1000);

//     const timeout = setTimeout(() => {
//       clearInterval(interval);
//       clearInterval(countdownInterval);
//     }, 60000); // Stop polling after 1 minute

//     return () => {
//       clearInterval(interval);
//       clearInterval(countdownInterval);
//       clearTimeout(timeout);
//     };
//   }, [reports]);

//   if (reports.some(report => report.status === 'running')) {
//     return <div className="z-50">Report running, refresh in: {refreshCountdown} seconds</div>;
//   }

//   if (loading) {
//     return <LoadingSpinner />; // Use your spinner component
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//   <div className="flow-root">
//   <ReportsTableClient reports={reports} />
//   </div>
// )
// };

// export default ReportsTableServer;