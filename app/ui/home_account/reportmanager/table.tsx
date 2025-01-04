'use client';
import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon
import ReportStatus from '@/app/ui/home_account/reportmanager/status';
import ReportTags from '@/app/ui/home_account/reportmanager/tags';
import { deleteReport } from '@/app/lib/actions'; // <-- Import deleteReport

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

const ReportsTableClient: React.FC<ReportsTableClientProps> = ({ reports }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [sortedReports, setSortedReports] = useState(reports);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Report; direction: 'ascending' | 'descending' } | null>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async (reportId: string) => {
    try {
      await deleteReport(reportId);
      // Optionally, you can add code to update the UI after deletion
      alert(`Report with ID ${reportId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting report:', error);
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

  return (
    <div className="mt-6 flow-root w-full">
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                  <button onClick={() => setActiveMenu(report.reportid.toString())}>
                    <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  {activeMenu === report.reportid.toString() && (
                    <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 z-50">
                      <ul>
                        <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Edit</li>
                        <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'result' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Run</li>
                        <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Schedule</li>
                        <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Clone</li>
                        <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Download</li>
                        <li className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(report.reportid.toString())}>Delete</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => handleSort('reportname')} className="px-4 py-5 text-left text-xs font-medium cursor-pointer tracking-wider">
                    Report Name {getSortIcon('reportname')}
                  </th>
                  <th onClick={() => handleSort('status')} className="px-4 py-5 text-xs text-left font-medium cursor-pointer tracking-wider">
                    Status {getSortIcon('status')}
                  </th>
                  <th onClick={() => handleSort('description')} className="px-4 py-5 text-xs text-left font-medium cursor-pointer tracking-wider">
                    Description {getSortIcon('description')}
                  </th>
                  <th onClick={() => handleSort('date_concept')} className="px-4 py-5 text-left text-xs font-medium cursor-pointer tracking-wider">
                    Date Concept {getSortIcon('date_concept')}
                  </th>
                  <th onClick={() => handleSort('period')} className="px-4 py-5 text-left text-xs font-medium cursor-pointer tracking-wider">
                    Period {getSortIcon('period')}
                  </th>
                  <th onClick={() => handleSort('tags')} className="px-4 py-5 text-left text-xs font-medium cursor-pointer tracking-wider">
                    Tags {getSortIcon('tags')}
                  </th>
                  <th onClick={() => handleSort('last_updated')} className="px-4 py-5 text-left text-xs font-medium cursor-pointer tracking-wider">
                    Last Updated {getSortIcon('last_updated')}
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedReports.map((report) => (
                  <tr key={report.reportid}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reportname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><ReportStatus status={report.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date_concept}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><ReportTags tags={report.tags ? report.tags.split(';') : []} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.last_updated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button onClick={() => setActiveMenu(report.reportid.toString())}>
                        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                      </button>
                      {activeMenu === report.reportid.toString() && (
                        <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 z-50">
                          <ul>
                            <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Edit</li>
                            <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'result' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Run</li>
                            <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Schedule</li>
                            <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Clone</li>
                            <li className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-100'}`}>Download</li>
                            <li className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(report.reportid.toString())}>Delete</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTableClient;