'use client';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/app/ui/LoadingSpinner';
const iconMap = {
  basic: ArrowRightCircleIcon
};

export default function CardWrapper() {
  const report_manager = 'Access all of your draft reports and final results.';
  const report_design = 'Quickly access to a new draft report design.';
  const status_loading = 'Be aware of the latest data loaded in your system.';
  const scheduler = 'Schedule your report to receive them by email or through sftp on a regular basis.';
  const config = 'Customize your own groupings, airline class mapping and more.';
  const profile = 'Customize your profile and user experience.';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardComponent title="Report Manager" value={report_manager} type='basic' path='/home_account/reportmanager' />
      <CardComponent title="Report Design" value={report_design} type='basic' path='/home_account/reportdesign/create' />
      <CardComponent title="Loading Status" value={status_loading} type='basic' path='/home_account/loadingstatus' />
      <CardComponent title="Scheduler" value={scheduler} type='basic' path='/home_account/scheduler' />
      <CardComponent title="Configuration" value={config} type='basic' path='/home_account/configuration' />
      <CardComponent title="Profile" value={profile} type='basic' path='/home_user/profile'/>
    </div>
  );
}

export function CardComponent({
  title,
  value,
  type,
  path
}: {
  title: string;
  value: string;
  type: keyof typeof iconMap;
  path: string;
}) {
  const Icon = iconMap[type];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); // Stop loading when the component mounts or updates
  }, []);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <>
    {loading && <LoadingSpinner />}
    <Link href={path} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    onClick={handleClick}>
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Icon className="w-8 h-8 text-gray-500" />
          <span className="text-lg font-semibold">{title}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700">{value}</p>
      </div>
      <div className="p-4 border-t">
        <div className="text-blue-500 hover:underline">
          Click here to access
        </div>
      </div>
    </Link>
     </>
  );
}