'use client';
import React, { useState, useEffect } from 'react';

interface Report {
  reportid: number;
  status: string;
}

interface RefreshCountdownProps {
  sortedReports: Report[];
  fetchReports: () => void;
}

const RefreshCountdown: React.FC<RefreshCountdownProps> = ({ sortedReports, fetchReports }) => {
  const [refreshCountdown, setRefreshCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      const hasRunningReports = sortedReports.some(report => report.status === 'running');
      if (hasRunningReports) {
        fetchReports();
        setRefreshCountdown(5); // Reset countdown to 5 seconds
      } else {
        clearInterval(interval);
      }
    }, 10000);

    const countdownInterval = setInterval(() => {
      setRefreshCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    }, 30000); // Stop polling after 1 minute

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
      clearTimeout(timeout);
    };
  }, [sortedReports]);

  const hasRunningReports = sortedReports.some(report => report.status === 'running');

  return (
    <div>
      {hasRunningReports && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg">
          Report running. Auto-refresh in: {refreshCountdown} seconds
        </div>
       )} 
    </div>
  );
};

export default RefreshCountdown;