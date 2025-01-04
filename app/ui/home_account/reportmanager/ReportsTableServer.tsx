'use client';
import React, { useState, useEffect } from 'react';
import ReportsTableClient from './table';
import LoadingSpinner from '@/app/ui/LoadingSpinner'; 

interface ReportsTableServerProps {
  query: string;
  currentPage: number;
}

const ReportsTableServer: React.FC<ReportsTableServerProps> = ({ query, currentPage }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/home_account/reportmanager/fetchFilteredReports?query=${encodeURIComponent(query)}&page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        return response.json();
      })
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [query, currentPage]);

  if (loading) {
    return <LoadingSpinner />; // Use your spinner component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ReportsTableClient reports={reports} />;
};

export default ReportsTableServer;