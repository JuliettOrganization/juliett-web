'use client';
import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // <-- Import Heroicon
import ReportStatus from '@/app/ui/home_account/reportmanager/status';
import ReportTags from '@/app/ui/home_account/reportmanager/tags';
import { deleteReport } from '@/app/lib/actions'; // <-- Import deleteReport

interface ReportsTableClientProps {
  reports: Array<{ reportid: string, reportname: string, status: string, description: string, date_concept: string, period: string, tags: string }>;
}

const ReportsTableClient: React.FC<ReportsTableClientProps> = ({ reports }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (reportId: string) => {
    setActiveMenu(activeMenu === reportId ? null : reportId);
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

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {reports?.map((report) => (
              <div key={report.reportid} className="mb-2 w-full rounded-md shadow p-4">
                <div><p className="text-sm text-purple-500">{report.reportname}</p></div>
                <div><ReportStatus status={report.status} /></div>
                <div><p className="text-sm text-purple-500">{report.description}</p></div>
                <div><p className="text-sm text-gray-500">{report.date_concept}</p></div>
                <div><p className="text-sm text-purple-500">{report.period}</p></div>
                <div><ReportTags tags={report.tags ? report.tags.split(';') : []} /></div>
                <div className="flex justify-end gap-2 relative">
                  <button onClick={() => toggleMenu(report.reportid)}>
                    <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  {activeMenu === report.reportid && (
                    <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 sm:right-full sm:mr-2 sm:w-auto">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Report</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Run Report</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Schedule Report</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Clone Report</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(report.reportid)}>Delete Report</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Report Name</th>
                <th scope="col" className="px-4 py-5 font-medium">Status</th>
                <th scope="col" className="px-4 py-5 font-medium">Description</th>
                <th scope="col" className="px-3 py-5 font-medium">Period Concept</th>
                <th scope="col" className="px-3 py-5 font-medium">Period</th>
                <th scope="col" className="px-3 py-5 font-medium">Tags</th>
                <th scope="col" className="relative py-3 pl-6 pr-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reports?.map((report) => (
                <tr key={report.reportid} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap px-4 py-3 sm:pl-6">{report.reportname}</td>
                  <td className="whitespace-nowrap px-4 py-3"><ReportStatus status={report.status} /></td>
                  <td className="whitespace-nowrap px-4 py-3">{report.description}</td>
                  <td className="whitespace-nowrap px-3 py-3">{report.date_concept}</td>
                  <td className="whitespace-nowrap px-3 py-3">{report.period}</td>
                  <td className="whitespace-nowrap px-4 py-3"><ReportTags tags={report.tags ? report.tags.split(';') : []} /></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3 relative">
                      <button onClick={() => toggleMenu(report.reportid)}>
                        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
                      </button>
                      {activeMenu === report.reportid && (
                        <div ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 sm:right-full sm:mr-2 sm:w-auto">
                          <ul>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Report</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Run Report</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Schedule Report</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Clone Report</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(report.reportid)}>Delete Report</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsTableClient;