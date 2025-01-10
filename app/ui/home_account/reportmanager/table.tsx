'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon
import ReportStatus from '@/app/ui/home_account/reportmanager/status';
import ReportTags from '@/app/ui/home_account/reportmanager/tags';

interface Report {
  reportid: number;
  reportname: string;
  description: string;
  date_concept: string;
  period: string;
  status: string;
  tags: string;
  last_updated: string;
}

interface ReportsTableClientProps {
  reports: Report[];
}

interface ErrorState {
  general?: string[];
}

interface DropDownMenuProps {
  report: Report;
  handleEditReport: (reportId: string) => void;
  handleDelete: (reportId: string) => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ report, handleEditReport, handleDelete }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (event: React.MouseEvent, action: () => void) => {
    event.stopPropagation();
    action();
    setIsMenuOpen(false); // Close the menu after action
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
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

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
      </button>
      {isMenuOpen && (
        <ul ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 z-50">
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={(event) => handleItemClick(event, () => handleEditReport(report.reportid.toString()))}
          >
            Edit
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'result' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Run
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Schedule
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Clone
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Download
          </li>
          <li
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={(event) => handleItemClick(event, () => handleDelete(report.reportid.toString()))}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};

const ReportsTableClient: React.FC<ReportsTableClientProps> = ({ reports }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [sortedReports, setSortedReports] = useState(reports);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Report; direction: 'ascending' | 'descending' } | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorState | null>(null);

  const handleSort = (key: keyof Report) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sorted = [...reports].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedReports(sorted);
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

  const handleDelete = async (reportId: string) => {
    try {
      const response = await fetch('/api/home_account/reportmanager/deleteReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportid: reportId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Report deleted successfully:', result);
        setPopupMessage('Report deleted successfully');
        setTimeout(() => {
          setPopupMessage(null);
          window.location.reload();
        }, 2000); // Hide the popup after 3 seconds and refresh the page
      } else {
        const result = await response.json();
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrors({ general: ['An unexpected error occurred.'] });
    }
  };

  const getSortIcon = (key: keyof Report) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <span>&uarr;</span>; // Up arrow
    }
    return <span>&darr;</span>; // Down arrow
  };

  const handleEditReport = (reportid: string) => {
    router.push(`/home_account/reportdesign/${reportid}`);
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="inline-block align-middle overflow-x-auto">
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
                <div className="flex justify-end gap-2 relative">
                  <DropDownMenu report={report} handleEditReport={handleEditReport} handleDelete={handleDelete} />
                </div>
              </div>
            ))}
          </div>
          
          <table className=" text-gray-900 min-w-full table-auto">
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
                  <th onClick={() => handleSort('last_updated')} className="px-4 py-5 text-left text-sm font-medium cursor-pointer tracking-wider">
                    Last Updated {getSortIcon('last_updated')}
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedReports.map((report) => (
                  <tr key={report.reportid} className="w-full border-b py-3 text-sm last-of-type:border-none">
                    <td className="px-6 py-4 break-words text-sm text-gray-500">{report.reportname}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500"><ReportStatus status={report.status} /></td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500">{report.description}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500">{report.date_concept}</td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500">{report.period}</td>
                    <td className="px-6 py-4 text-sm text-gray-500"><div><ReportTags tags={report.tags ? report.tags.split(';') : []} /></div></td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500">{report.last_updated}</td>
                    <td className="px-6 py-4 break-words text-right text-sm font-medium relative">
                      <DropDownMenu report={report} handleEditReport={handleEditReport} handleDelete={handleDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         
        </div>
      </div>
      {popupMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg">
          {popupMessage}
        </div>
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
    </div>
  );
};

export default ReportsTableClient;