import {ArrowRightCircleIcon} from '@heroicons/react/24/outline';
const iconMap = {
  basic: ArrowRightCircleIcon
};
import Link from 'next/link';


export default async function CardWrapper() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  const Basic_account = 'This is an normal account.';
    const Admin_account = 'This is the Admin page.';

  return (
    <>
      {/* {The list  of cards will have to be dynamically taken from the database to get teh list of accounts the user shoudl have access to} */}

      <Card title="ABCD Travel Global" value={Basic_account} type='basic' path='/home_account'/>
      <Card title="Admin" value={Admin_account} type='basic' path='/admin' />
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
