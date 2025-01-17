'use client';
import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import PopupNotification from '../../PopupNotification';
import LoadingSpinner from '../../LoadingSpinner';

interface SchedulePopupProps {
  onClose: () => void;
  reportid: number;
}

const SchedulePopup: React.FC<SchedulePopupProps> = ({  onClose, reportid }) => {
  const [isSchedulerActive, setIsSchedulerActive] = useState(false);
  const [scheduleFrequency, setFrequency] = useState('daily');
  const [schedulePeriodConcept, setPeriodConcept] = useState('Last Period');
  const [scheduleFirstDayOfYear, setFirstDayOfYear] = useState(new Date());
  const [scheduleEmail, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
 
  useEffect(() => {
    if (reportid) {
      fetch(`/api/home_account/reportmanager/getReportScheduleDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportid }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch report details');
          }
          return response.json();
        })
        .then((reportData) => {
            setIsSchedulerActive(reportData.isscheduleractive ?? false);
            setFrequency(reportData.schedulefrequency ?? 'daily');
            setPeriodConcept(reportData.scheduleperiodconcept ?? 'Last Period');
            setFirstDayOfYear(reportData.schedulefirstdayofyear ? new Date(reportData.schedulefirstdayofyear) : new Date());
            setEmail(reportData.scheduleemail ?? '');
          
        })
        .catch((error) => {
          console.error('Error fetching report details:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [reportid]);

  if (loading) {
    return <LoadingSpinner />;
  }
  const handleSave = async () => {
    const scheduleData = {
      isSchedulerActive,
      scheduleFrequency,
      schedulePeriodConcept,
      scheduleFirstDayOfYear,
      scheduleEmail,
      reportid,
    };

    try {
      const response = await fetch('/api/home_account/reportmanager/updateScheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scheduleData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report');
      }

      const result = await response.json();
      setPopupMessage(result.message);
      setTimeout(() => setPopupMessage(null), 3000);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating report:', error);
      setPopupMessage('Failed to update report');
      setTimeout(() => setPopupMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex text-left items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl text-left font-semibold mb-4">Schedule Report</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <Switch
              checked={isSchedulerActive}
              onChange={setIsSchedulerActive}
              className={`${isSchedulerActive ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Activate Scheduler</span>
              <span
                className={`${isSchedulerActive ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
            <span className="ml-2">Activate Scheduler</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Frequency</label>
          <select
            value={scheduleFrequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Period Concept</label>
          <select
            value={schedulePeriodConcept}
            onChange={(e) => setPeriodConcept(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="Last Period">Last Period</option>
            <option value="YTD">YTD</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Year Start (only day and month will be used)</label>
          <input
            id="firstDayOfYear"
            name="firstDayOfYear"
            type="date"
            value={scheduleFirstDayOfYear.toISOString().split('T')[0]}
            onChange={(e) => setFirstDayOfYear(new Date(e.target.value))}
            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 ${schedulePeriodConcept === 'Last Period' ? 'bg-gray-100 text-gray-300' : ''}`}
            disabled={schedulePeriodConcept === 'Last Period'}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            value={scheduleEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter email address"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => { setLoading(true); handleSave(); }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
      {popupMessage && <PopupNotification message={popupMessage} />}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default SchedulePopup;