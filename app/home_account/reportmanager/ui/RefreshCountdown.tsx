// import { TIMEOUT } from 'dns';
// import React, { useState, useEffect } from 'react';

// interface RefreshCountdownProps {
//   sortedReports: any[];
//   fetchReports: () => void;
// }

// const RefreshCountdown: React.FC<RefreshCountdownProps> = ({ sortedReports, fetchReports }) => {
//   const [refreshCountdown, setRefreshCountdown] = useState<number>(() => {
//     const savedCountdown = localStorage.getItem('refreshCountdown');
//     return savedCountdown ? parseInt(savedCountdown, 10) : 10;
//   });
//   const [stopPolling, setStopPolling] = useState<boolean>(() => {
//     const savedStopPolling = localStorage.getItem('stopPolling');
//     return savedStopPolling ? JSON.parse(savedStopPolling) : false;
//   });
//   useEffect(() => {
//     localStorage.setItem('stopPolling', 'false');
//     localStorage.removeItem('timeout');
//   }, []);

//   useEffect(() => {
//     // if (stopPolling) return;

//     const interval = setInterval(() => {
//       if (hasRunningReports && !stopPolling) {
//         fetchReports();
//         setRefreshCountdown(10); // Reset countdown to 10 seconds
//         localStorage.setItem('refreshCountdown', '10');
//       } else {
//         clearInterval(interval);
//       }
//     }, 10000);

//     const countdownInterval = setInterval(() => {
//       setRefreshCountdown(prev => {
//         const newCountdown = prev > 0 ? prev - 1 : 0;
//         localStorage.setItem('refreshCountdown', newCountdown.toString());
//         return newCountdown;
//       });
//     }, 1000);

//     const timeout = setTimeout(() => {
//       setStopPolling(true);
//       localStorage.setItem('stopPolling', 'true');
//       clearInterval(interval);
//       clearInterval(countdownInterval);
//     }, 30000); // Stop polling after 30 seconds

//     localStorage.setItem('timeout', timeout.toString());

//     return () => {
//       clearInterval(interval);
//       clearInterval(countdownInterval);
//       // clearTimeout(timeout);
//     };
//   }, [sortedReports]);

//   const hasRunningReports = sortedReports.some(report => report.status === 'running');

//   return (
//     <div>
//       {hasRunningReports && localStorage.getItem('stopPolling') === 'false' ? (
//         <div className="fixed top-24 left-1/2 transform -translate-x-1/2 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg">
//           Report running. Auto-refresh in: {refreshCountdown} seconds
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default RefreshCountdown;