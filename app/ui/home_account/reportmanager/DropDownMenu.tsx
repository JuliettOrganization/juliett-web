'use client';
import React, { useState, useRef, useEffect } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import PopupNotification from '@/app/ui/PopupNotification';
import SchedulePopup from './schedulePopup';

interface Report {
  reportid: number;
  status: string;
}

interface DropDownMenuProps {
  report: Report;
  handleEditReport: (reportId: string) => void;
  handleDelete: (reportId: string) => void;
  handleClone: (reportId: string) => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ report, handleEditReport, handleDelete, handleClone }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);

  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  const handleClickDownload = () => {
    setPopupMessage('Downloading Report');
    setTimeout(() => {
      setPopupMessage(null);
      window.location.reload();
    }, 2000); // Hide the popup after 3 seconds and refresh the page
  };

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

  const handleScheduleClick = () => {
    setIsSchedulePopupOpen(true);
  };

  const handleScheduleSave = (scheduleData: any) => {
    console.log('Schedule data saved:', scheduleData);
    // Add your save logic here
  };

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700" />
      </button>
      {isMenuOpen && (
        <ul ref={menuRef} className="absolute right-0 mr-2 bg-white shadow-lg rounded w-48 z-50">
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={(event) => {
              if (report.status !== 'running') {
          setLoading(true);
          handleItemClick(event, () => handleEditReport(report.reportid.toString()));
              }
            }}
          >
            Edit
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={(event) => {
              if (report.status !== 'running' && report.status !== 'draft') {
          handleScheduleClick();
              }
            }}
          >
            Schedule
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'result' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={(event) => {
              if (report.status !== 'running' && report.status !== 'result') {
          setLoading(true);
          handleItemClick(event, () => handleClone(report.reportid.toString()));
              }
            }}
          >
            Clone
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${report.status === 'running' || report.status === 'draft' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {report.status === 'running' || report.status === 'draft' ? (
              'Download'
            ) : (
              <Link href={`/api/home_account/reportmanager/downloadReport/${report.reportid}`} onClick={() => { handleClickDownload() }}>
          Download
              </Link>
            )}
          </li>
          <li
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={(event) => { setLoading(true); handleItemClick(event, () => handleDelete(report.reportid.toString())) }}
          >
            Delete
          </li>
        </ul>
       
      )}
      {isSchedulePopupOpen && (
        <SchedulePopup
          onClose={() => setIsSchedulePopupOpen(false)}
          
          reportid={report.reportid}
        />
      )}
      {loading && (
        <LoadingSpinner/>
      )}
      {popupMessage && (
        <PopupNotification
          message={popupMessage}
        />
      )}
    </div>
  );
};

export default DropDownMenu;