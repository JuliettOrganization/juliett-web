'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';



export function CreateReport() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Add your logic here
  };

  return (
    <div><Link
      href="/home_account/reportdesign/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={handleClick}
    >
      <span className="hidden md:block">{loading ? 'Loading...' : 'Create Report'}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
     {loading && (
      <LoadingSpinner/>
     )}</div>
  );
}

export function RefreshPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Add your logic here
  };

  return (
    <div><button
      onClick={() => {
        handleClick();
        window.location.reload();
      }}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 p-1 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
      <ArrowPathIcon className="w-5 h-5" />
    </button>
     {loading && (
      <LoadingSpinner/>
     )}</div>
  );
}



export const useReportActions = () => {
  const router = useRouter();

  const handleEditReport = (reportid: string) => {
    router.push(`/home_account/reportdesign/${reportid}`);
  };

  const handleDelete = async (reportId: string, setPopupMessage: (message: string | null) => void, setErrors: (errors: any) => void) => {
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

  const handleClone = async (reportId: string, setPopupMessage: (message: string | null) => void, setErrors: (errors: any) => void) => {
    try {
      const response = await fetch('/api/home_account/reportmanager/cloneReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportid: reportId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Report cloned successfully:', result);
        setPopupMessage('Report cloned successfully');
        setTimeout(() => {
          setPopupMessage(null);
          window.location.reload();
        }, 2000); // Hide the popup after 3 seconds and refresh the page
      } else {
        const result = await response.json();
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error cloning account:', error);
      setErrors({ general: ['An unexpected error occurred.'] });
    }
  };

  return {
    handleEditReport,
    handleDelete,
    handleClone,
  };
};

