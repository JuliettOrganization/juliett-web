'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReportStatus from '@/app/ui/home_account/reportmanager/status';
import ReportTags from '@/app/ui/home_account/reportmanager/tags';
import DropDownMenu from '@/app/ui/home_account/reportmanager/DropDownMenu';
// import RefreshCountdown from '@/app/ui/home_account/reportmanager/RefreshCountdown';
import { useAccount } from '@/app/context/AccountContext';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import PopupNotification from '@/app/ui/PopupNotification';
import { useReportActions } from '@/app/ui/home_account/reportmanager/buttons';
import { ClockIcon } from '@heroicons/react/24/outline';



interface Report {
  reportid: number;
  reportname: string;
  description: string;
  date_concept: string;
  period: string;
  status: string;
  tags: string;
  last_updated: string;
  isscheduleractive: boolean;
}

interface ReportsTableClientProps {
  query: string;
  currentPage: number;
}

interface ErrorState {
  general?: string[];
}

const ReportsTableClient: React.FC<ReportsTableClientProps> = ({ query, currentPage }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [sortedReports, setSortedReports] = useState<Report[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Report; direction: 'asc' | 'desc' } | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accountid } = useAccount();
  const { handleEditReport, handleDelete, handleClone } = useReportActions();


  const fetchReports = async () => {
    if (accountid) {
      setLoading(true);
      try {
        const sortParam = sortConfig ? `${sortConfig.key}:${sortConfig.direction}` : '';

        const response = await fetch(`/api/home_account/reportmanager/fetchFilteredReports?accountid=${accountid}&query=${encodeURIComponent(query)}&page=${currentPage}&sort=${sortParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setSortedReports(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError((error as Error).message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchReports();
  }, [accountid, query, currentPage, sortConfig, fetchReports]);

  const handleSort = (key: keyof Report) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
      setSortConfig({ key, direction });
    };

    
  const getSortIcon = (key: keyof Report) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'asc') {
      return <span>&uarr;</span>; // Up arrow
    }
    return <span>&darr;</span>; // Down arrow
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Use your spinner component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col mt-6">
      {/* <RefreshCountdown sortedReports={sortedReports} fetchReports={fetchReports} /> */}
      <div className="inline-block align-middle text-left overflow-x-auto">
        <div className="flex flex-col rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sortedReports.map((report) => (
              <div key={report.reportid} className="mb-2 w-full rounded-md shadow p-4">
                <div><p className="text-sm text-gray-500">{report.reportname}</p></div>
                <div><ReportStatus status={report.status} /></div>
                <div><p className="text-sm text-gray-500">{report.description}</p></div>
                <div><p className="text-sm text-gray-500">{report.date_concept}</p></div>
                <div><p className="text-sm text-gray-500">{report.period}</p></div>
                <div><ReportTags tags={report.tags ? report.tags.split(';') : []} /></div>
            

                <div>
                  {report.isscheduleractive ? (
                    <ClockIcon className="rounded-full bg-blue-500 h-8 w-8 p-1 text-center justify-center text-white"/>
                  ) : (
                    <p className="text-sm text-gray-500"></p>
                  )}
                </div>
                <div className="flex justify-end gap-2 relative">
                <DropDownMenu report={report} handleEditReport={handleEditReport} handleDelete={(reportId) => handleDelete(reportId, setPopupMessage, setErrors)} handleClone={(reportId) => handleClone(reportId, setPopupMessage, setErrors)} />
                </div>
              </div>
            ))}
          </div>
          
            <table className="hidden md:table text-gray-900 min-w-full table-auto">
          <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th onClick={() => handleSort('reportname')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Report Name {getSortIcon('reportname')}
                  </th>
                  <th onClick={() => handleSort('status')} className="px-4 py-5 text-sm text-left font-medium cursor-pointer tracking-wider">
                    Status {getSortIcon('status')}
                  </th>
                  <th onClick={() => handleSort('description')} className="px-4 py-5 text-sm text-left font-medium cursor-pointer tracking-wider">
                    Description {getSortIcon('description')}
                  </th>
                  <th onClick={() => handleSort('date_concept')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Date Concept {getSortIcon('date_concept')}
                  </th>
                  <th onClick={() => handleSort('period')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Period {getSortIcon('period')}
                  </th>
                  <th onClick={() => handleSort('tags')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Tags {getSortIcon('tags')}
                  </th>
                  <th onClick={() => handleSort('isscheduleractive')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Scheduler {getSortIcon('isscheduleractive')}
                  </th>
                  <th onClick={() => handleSort('last_updated')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Last Updated {getSortIcon('last_updated')}
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-left divide-y divide-gray-200">
                {sortedReports.map((report) => (
                  <tr key={report.reportid} className="w-full border-b py-3 text-sm last-of-type:border-none">
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.reportname}</td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500"><ReportStatus status={report.status} /></td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.description}</td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.date_concept}</td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.period}</td>
                    <td className="px-4 py-4 text-sm text-gray-500"><div><ReportTags tags={report.tags ? report.tags.split(';') : []} /></div></td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.isscheduleractive ? (
                    <ClockIcon className="rounded-full bg-blue-500 h-8 w-8 p-1 text-center justify-center text-white" />
                  ) : (
                    <p className="text-sm text-gray-500"></p>
                  )}</td>
                    <td className="px-4 py-4 break-words text-sm text-gray-500">{report.last_updated}</td>
                    <td className="px-6 py-4 break-words text-right text-sm font-medium relative">
                    <DropDownMenu report={report} handleEditReport={handleEditReport} handleDelete={(reportId) => handleDelete(reportId, setPopupMessage, setErrors)} handleClone={(reportId) => handleClone(reportId, setPopupMessage, setErrors)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         
        </div>
      </div>
      {popupMessage && (
        <PopupNotification
          message={popupMessage}
        />
      )}
      {errors && (
        <div className="mt-4 text-red-500">
          <ul>
            {Object.entries(errors).map(([field, errorMessages]) => (
              <li key={field}>{field}: {(errorMessages as string[]).join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
      {loading && (
           {LoadingSpinner}    
          )}
    </div>
  );
};

export default ReportsTableClient;