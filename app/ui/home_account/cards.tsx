import {ArrowRightCircleIcon} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
const iconMap = {
  basic: ArrowRightCircleIcon
};
import Link from 'next/link';
import clsx from 'clsx';


export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  const report_manager = 'Access all of your draft reports and final results.';
    const report_design = 'Quickly access to a new draft report design.';
    const status_loading = 'Be aware of the latest data loaded in your system.';
    const scheduler = 'Schedule your report to receive them by email or through sftp on a regular basis.';
    const config = 'Customize your own groupings, airline class mapping and more.';
    const profile = 'Customize your profle and user experience.';
    
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Report Manager" value={report_manager} type='basic' path='/home_account/reportmanager'/>
      <Card title="Report Design" value={report_design} type='basic' path='/home_account/reportdesign' />
      <Card title="Loading Status" value={status_loading} type='basic' path='/home_account/loadingstatus' />
      <Card title="Scheduler" value={scheduler} type='basic' path='/home_account/scheduler'/>
      <Card title="Configuration" value={config} type='basic' path='/home_account/configuration'/>
      <Card title="Profile" value={profile} type='basic' path='/home_account/Profile'/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
  path,
 
}: {
  title: string;
  value: string;
  type: 'basic';
  path: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 hover:bg-purple-100 hover:text-purple-600">
      <Link href={path}
      >
      <div className="flex p-4 hover:bg-purple-100 hover:text-purple-600">
        
        {Icon ? <Icon className="h-7 w-7 text-purple-500 " /> : null}
        <h3 className="ml-2 text-xl text-purple-500 font-medium  "
        >{title}</h3>
      </div>
      
      <p
       className='flex flex-col items-start text-gray-500 rounded-xl px-14 text-left text-sm h-24'>
        {value}
      </p>
      </Link>
    </div>
  );
}
